import Pica from 'pica';
import { StringArtWorkerResponse, StringArtWorkerMsg } from "../types/WorkerMessages";
import { WorkingStatus } from '../types/enum/WorkingStatus';
import { MIN_DISTANCE, OUTPUT_SCALING_FACTOR } from '../Constants';
import { RefObject } from 'react';
import { getContext } from '../utils/CanvasOperations';
import sleep from '../utils/TimeUtils';

const pica = Pica();

export class StringArtDrawer {

    public async startFindingBestLines(
        canvasRef: RefObject<HTMLCanvasElement>,
        maxLineCount: number,
        stringWeight: number,
        setCount: React.Dispatch<React.SetStateAction<number>>,
        setViewedImage: React.Dispatch<React.SetStateAction<ImageData | null>>,
        setNailSequence: React.Dispatch<React.SetStateAction<number[]>>,
        setStringArtInProgress: React.Dispatch<React.SetStateAction<boolean>>
    ) {
        if (!canvasRef.current) {
            throw Error("Unable to find the canvas")
        }
        let canvas: HTMLCanvasElement = canvasRef.current;
        let ctx: CanvasRenderingContext2D = getContext(canvas)
        let imageData: ImageData = ctx.getImageData(0, 0, canvas.clientWidth, canvas.clientHeight);
        let nailSeq: number[] = [];

        const startX = (canvas.clientWidth / 2);
        const startY = (canvas.clientHeight / 2);
        const radius = Math.min(canvas.clientWidth, canvas.clientHeight) / 2;

        ctx.globalCompositeOperation = 'destination-in';
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();

        this.convertToGrayscale(imageData);
        await sleep(1000)
        ctx.putImageData(imageData, 0, 0);
        ctx.globalCompositeOperation = 'source-over';
        const lineSolverMsgToWorker: StringArtWorkerMsg = {
            maxLineCount: maxLineCount,
            imageData: imageData,
            height: canvas.clientHeight,
            width: canvas.clientWidth,
            outputScalingFactor: OUTPUT_SCALING_FACTOR,
            stringWeight: stringWeight,
            skip: MIN_DISTANCE,
            allLineCoordinates: {},
            nailsCordinates: []
        }
        const stringArtWorker = new Worker(new URL("../workers/StringArtCreating.Worker.ts", import.meta.url));

        stringArtWorker.postMessage(lineSolverMsgToWorker);
        stringArtWorker.onmessage = function (e) {
            const lineSolverMsgFromWorker: StringArtWorkerResponse = e.data

            if (lineSolverMsgFromWorker.status == WorkingStatus.INPROGRESS) {
                if (lineSolverMsgFromWorker.imageData == undefined) {
                    setCount(lineSolverMsgFromWorker.count)
                } else {
                    if (lineSolverMsgFromWorker.imageData != undefined) {
                        showImage(ctx, lineSolverMsgFromWorker.imageData, canvas.clientHeight, canvas.clientWidth)
                    }
                }
            } else if (lineSolverMsgFromWorker.status == WorkingStatus.COMPLETED) {
                setViewedImage(lineSolverMsgFromWorker.imageData)
                setNailSequence(lineSolverMsgFromWorker.nailSequence)
                setStringArtInProgress(false)
                stringArtWorker.terminate()
            }
        };
        return { nailSeq };
    }
    private convertToGrayscale(imageData: ImageData) {
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            const gray = 0.21 * r + 0.72 * g + 0.07 * b;
            data[i] = gray;
            data[i + 1] = gray;
            data[i + 2] = gray;
        }
    }
}


function showImage(outputContext: CanvasRenderingContext2D, imageData: ImageData, clientHeight: number, clientWidth: number): void {
    const canvas = document.createElement('canvas');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    const ctx = getContext(canvas);

    if (ctx != null) {
        ctx.putImageData(imageData, 0, 0);

        const outputCanvas = document.createElement('canvas');
        outputCanvas.width = clientWidth;
        outputCanvas.height = clientHeight;

        pica.resize(canvas, outputCanvas, {
            quality: 3
        }).then(() => {
            if (outputContext != null) {
                outputContext.drawImage(outputCanvas, 0, 0);
            }
        }).catch((error) => {
            console.error("Error during resizing with Pica: ", error);
        }).finally(() => {
            canvas.remove();
            outputCanvas.remove();
        });;
    }
}