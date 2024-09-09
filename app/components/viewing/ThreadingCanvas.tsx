"use client";
import { useEffect, useRef, useState } from "react";
import { ThreadingAlgorithm } from '../../algorithm/ThreadingAlgorithm';
import { ControlType } from "@/app/types/enum/ControlType";
import { ManualDraw } from "@/app/algorithm/ManualDraw";
import { FaDownload } from "react-icons/fa";

interface Props {
    imgXPos: number
    imgYPos: number
    imgScale: number
    image: HTMLImageElement | null
    setNailSequence: React.Dispatch<React.SetStateAction<number[]>>
    startManualThreading: boolean
    controlType: ControlType
    nailSequenseIndex: number
}
function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const ThreadingCanvas: React.FC<Props> = (props: Props) => {
    const { imgXPos, imgYPos, imgScale, image, setNailSequence, startManualThreading, controlType, nailSequenseIndex } = props
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D>()
    const [img, setImg] = useState<HTMLImageElement>()
    const [count, setCount] = useState<number>(0)
    const startX = Math.floor(500 / 2 - 1);
    const startY = Math.floor(500 / 2 - 1);
    const manualDraw = new ManualDraw("string_art")
    let threadingResult: { nailSeq: number[], allLineCoordinates: { [key: string]: Array<[number, number]>; } };
    useEffect(() => {
        if (context != null && img != undefined && canvasRef.current) {
            const canvasWidth = 500 * imgScale;
            const canvasHeight = 500 * imgScale;

            const imageAspectRatio = img.width / img.height;
            const canvasAspectRatio = canvasWidth / canvasHeight;

            let drawWidth = canvasWidth;
            let drawHeight = canvasHeight;

            if (imageAspectRatio > canvasAspectRatio) {
                drawHeight = canvasWidth / imageAspectRatio;
                drawWidth = canvasWidth;
            } else {
                drawWidth = canvasHeight * imageAspectRatio;
                drawHeight = canvasHeight;
            }
            const xOffset = (canvasWidth - (drawWidth)) / 2;
            const yOffset = (canvasHeight - (drawHeight)) / 2;

            context.clearRect(0, 0, 500, 500);
            context.globalAlpha = 1;
            context.globalCompositeOperation = 'source-over';
            console.log("In Threading canvas", xOffset + imgXPos, ", ", yOffset + imgYPos)
            context.drawImage(img, xOffset + imgXPos, yOffset + imgYPos, drawWidth, drawHeight);
            context.globalCompositeOperation = 'destination-in';
            context.beginPath();
            context.arc(startX, startY, 249, 0, Math.PI * 2);
            context.closePath();
            context.fill();
        }
    }, [imgXPos, imgYPos, imgScale])
    useEffect(() => {
        if (canvasRef.current && image) {
            if (canvasRef.current) {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext("2d");

                if (ctx != null) {
                    const canvasWidth = 500;
                    const canvasHeight = 500;

                    const imageAspectRatio = image.width / image.height;
                    const canvasAspectRatio = canvasWidth / canvasHeight;

                    let drawWidth = canvasWidth;
                    let drawHeight = canvasHeight;

                    if (imageAspectRatio > canvasAspectRatio) {
                        drawHeight = canvasWidth / imageAspectRatio;
                        drawWidth = canvasWidth;
                    } else {
                        drawWidth = canvasHeight * imageAspectRatio;
                        drawHeight = canvasHeight;
                    }

                    const xOffset = (canvasWidth - drawWidth) / 2;
                    const yOffset = (canvasHeight - drawHeight) / 2;

                    canvas.width = canvasWidth;
                    canvas.height = canvasHeight;

                    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                    ctx.drawImage(image, xOffset, yOffset, drawWidth, drawHeight);
                    ctx.globalCompositeOperation = 'destination-in';
                    ctx.beginPath();
                    ctx.arc(startX, startY, 249, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.fill();
                    setImg(image);
                    setContext(ctx)
                }
            }
        }
    }, [image]);

    async function startThreading(): Promise<void> {
        if (context && canvasRef.current && img) {
            const dataURL = canvasRef.current.toDataURL();
            const newImage = new Image();
            newImage.src = dataURL;
            context.clearRect(0, 0, 500, 500);
            await sleep(100)
            context.globalCompositeOperation = 'source-over';
            context.drawImage(newImage, 0, 0);
            let algorithm = new ThreadingAlgorithm("string_art")
            threadingResult = await algorithm.startThreading(newImage, setCount, setNailSequence)
        }
    }
    useEffect(() => {
        if (context && startManualThreading) {
            context.clearRect(0, 0, 500, 500);
        }
    }, [startManualThreading])
    useEffect(() => {
        // if (controlType == ControlType.RIGHT) {
        //     manualDraw.drawRight(threadingResult.nailSeq, nailSequenseIndex, canvasRef, threadingResult.allLineCoordinates);
        // } else {
        //     manualDraw.drawLeft(threadingResult.nailSeq, nailSequenseIndex, canvasRef, threadingResult.allLineCoordinates);
        // } 
    }, [nailSequenseIndex])
    const handleDownload = () => {
        if (count > 0) {
            // Implement your download logic here
            console.log('Download started');
        }
    };
    return (
        <div className="relative flex flex-col items-center space-y-4">
            <canvas ref={canvasRef} id="string_art" className="border-2 border-gray-300 rounded-2xl" />
            <div className="relative w-full bg-gray-200 rounded-full h-4">
                <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{ width: `${(count / 4000) * 100}%` }}
                ></div>
                <span
                    className="absolute inset-0 flex items-center justify-center text-black font-bold"
                    style={{ right: '0', paddingRight: '4px' }}
                >
                    {`${Math.min((count / 4000) * 100, 100).toFixed(0)}%`}
                </span>
            </div>
            <div className="text-lg font-semibold text-gray-800">
                Line count: {count}
            </div>

            <button
                onClick={() => startThreading()}
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all"
            >
                Start Threading
            </button>

            <button
                onClick={handleDownload}
                className={`absolute top-0 right-4 p-2 rounded-full ${
                    count > 0 ? 'bg-green-500' : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={count === 0}
            >
                <FaDownload className="text-white" />
            </button>
        </div>
    );
};

export default ThreadingCanvas;
