"use client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
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
    setFinalImage: Dispatch<SetStateAction<ImageData | null>>
}
function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const ThreadingCanvas: React.FC<Props> = (props: Props) => {
    const { imgXPos, imgYPos, imgScale, image, setNailSequence, startManualThreading, controlType, nailSequenseIndex, setFinalImage } = props
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D>()
    const [count, setCount] = useState<number>(0)
    const [downloadDisabled, setDownloadDisabled] = useState<boolean>(true)
    const [viewedImage, setViewedImage] = useState<ImageData | null>(null)
    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            canvas.width = 500;
            canvas.height = 500;
            const ctx = canvas.getContext("2d");
            if (ctx != null) {
                setContext(ctx)
            }
        }
    }, [])
    useEffect(() => {
        if (viewedImage) {
            setDownloadDisabled(false)
            setFinalImage(viewedImage)
        } else {
            setDownloadDisabled(true)
            setFinalImage(null)
        }
    }, [viewedImage])
    useEffect(() => {
        if (context && image) {
            const canvasWidth = 500 * imgScale;
            const canvasHeight = 500 * imgScale;

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

            const xOffset = (canvasWidth - (drawWidth)) / 2;
            const yOffset = (canvasHeight - (drawHeight)) / 2;

            context.clearRect(0, 0, canvasWidth, canvasHeight);
            context.globalAlpha = 1;
            context.globalCompositeOperation = 'source-over';
            context.drawImage(image, xOffset + imgXPos, yOffset + imgYPos, drawWidth, drawHeight);
            context.globalCompositeOperation = 'destination-in';

            circleCrop(context);
        }
    }, [imgXPos, imgYPos, imgScale, image]);

    async function startThreading(): Promise<void> {
        if (context && canvasRef.current && image) {
            const dataURL = canvasRef.current.toDataURL();
            const newImage = new Image();
            newImage.src = dataURL;
            await sleep(100)
            context.globalCompositeOperation = 'source-over';
            context.drawImage(newImage, 0, 0);
            let algorithm = new ThreadingAlgorithm()
            await algorithm.startThreading("string_art", newImage, setCount, setNailSequence, setViewedImage)
        }
    }

    const circleCrop = (context: CanvasRenderingContext2D) => {
        const startX = Math.floor(500 / 2 - 1);
        const startY = Math.floor(500 / 2 - 1);
        context.beginPath();
        context.arc(startX, startY, 249, 0, Math.PI * 2);
        context.closePath();
        context.fill();
    }
    const handleDownload = () => {
        if (viewedImage) {
            downloadFinalImage(viewedImage)
        }
    };

    const downloadFinalImage = (targetResized: ImageData) => {
        const offscreenCanvas = new OffscreenCanvas(targetResized.width, targetResized.height);
        const offScreenContext = offscreenCanvas.getContext('2d');
        if (!offScreenContext) {
            throw new Error('2D context not available');
        }

        offScreenContext.putImageData(targetResized, 0, 0);

        offscreenCanvas.convertToBlob().then(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'image.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }
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
                className={`absolute top-0 right-4 p-2 rounded-full ${!downloadDisabled ? 'bg-green-500' : 'bg-gray-400 cursor-not-allowed'
                    }`}
                disabled={downloadDisabled}
            >
                <FaDownload className="text-white" />
            </button>
        </div>
    );
};

export default ThreadingCanvas;
