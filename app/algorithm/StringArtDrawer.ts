import Pica from 'pica';
import { StringArtWorkerResponse, StringArtWorkerMsg } from "../types/WorkerMessages";
import { CurrentStatus } from '../types/enum/CurrentStatus';

const pica = Pica();
export class StringArtDrawer {
    private height: number = 500;
    private width: number = 500;
    private output_scaling_factor: number = 7;
    private skip: number = 20;

    public async draw(
        canvasId: string,
        image: HTMLImageElement | null,
        maxLineCount: number,
        stringWeight: number,
        setCount: React.Dispatch<React.SetStateAction<number>>,
        setViewedImage: React.Dispatch<React.SetStateAction<ImageData | null>>
    ) {
        let canvas: HTMLCanvasElement = document.getElementById(canvasId) as HTMLCanvasElement;
        let ctx: CanvasRenderingContext2D | null = null
        let imageData: ImageData;
        let nailSeq: number[] = [];
        if (canvas) {
            ctx = canvas.getContext('2d');
            if (ctx && image) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.globalCompositeOperation = 'source-over';
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

                imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                ctx.globalCompositeOperation = 'destination-in';
                ctx.beginPath();
                ctx.arc(Math.floor(500 / 2 - 1), Math.floor(500 / 2 - 1), 250, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();

                this.convertToGrayscale(imageData);

                ctx.putImageData(imageData, 0, 0);
                ctx.globalCompositeOperation = 'destination-in';
                ctx.beginPath();
                ctx.arc(Math.floor(500 / 2 - 1), Math.floor(500 / 2 - 1), 250, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
                ctx.globalCompositeOperation = 'source-over';
                const lineSolverMsgToWorker: StringArtWorkerMsg = {
                    maxLineCount: maxLineCount,
                    imageData: imageData,
                    height: this.height,
                    width: this.width,
                    outputScalingFactor: this.output_scaling_factor,
                    stringWeight: stringWeight,
                    skip: this.skip,
                    allLineCoordinates: {},
                    nailsCordinates: []
                }
                const stringArtWorker = new Worker(new URL("./StringArtWorker.ts", import.meta.url));

                console.log("Started post message to lineSolverWorker")
                stringArtWorker.postMessage(lineSolverMsgToWorker);
                stringArtWorker.onmessage = function (e) {
                    const lineSolverMsgFromWorker: StringArtWorkerResponse = e.data

                    if (lineSolverMsgFromWorker.status == CurrentStatus.INPROGRESS) {
                        if (lineSolverMsgFromWorker.imageData == undefined) {
                            setCount(lineSolverMsgFromWorker.count)
                        } else {
                            if (lineSolverMsgFromWorker.imageData != undefined) {
                                if (ctx) {
                                    showImage(ctx, lineSolverMsgFromWorker.imageData)
                                }
                            }
                        }
                    } else if (lineSolverMsgFromWorker.status == CurrentStatus.COMPLETED) {
                        setViewedImage(lineSolverMsgFromWorker.imageData)
                    }                    
                };
            }
        }
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
function drawNails(nailsCordinates: [number, number][], ctx: CanvasRenderingContext2D) {
    nailsCordinates.forEach(([xx, yy]) => {
        for (let x = xx; x < xx + 2; x++) {
            for (let y = yy; y < yy + 2; y++) {
                if (ctx) {
                    const pixelData = ctx.createImageData(1, 1);
                    pixelData.data[0] = 255;
                    pixelData.data[1] = 0;
                    pixelData.data[2] = 0;
                    pixelData.data[3] = 255;
                    ctx.putImageData(pixelData, x, y);
                }
            }
        };
    });
}


function cleanup(ctx: CanvasRenderingContext2D | null, canvas: HTMLCanvasElement | null) {
    if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    canvas = null;
    ctx = null;
}


function showImage(outputContext: CanvasRenderingContext2D, imageData: ImageData): void {
    const canvas = document.createElement('canvas');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    const ctx = canvas.getContext("2d");

    if (ctx != null) {
        ctx.putImageData(imageData, 0, 0);

        const outputCanvas = document.createElement('canvas');
        outputCanvas.width = 500;
        outputCanvas.height = 500;

        pica.resize(canvas, outputCanvas, {
            quality: 3
        }).then((result) => {
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