"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ThreadingGreedyAlgorithm } from "@/app/algorithm/ThreadingGreedyAlgorithm";
import { DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT } from "@/app/utils/constants";
import ImageDownloader from "./ImageDownloader";
import ThreadingProgressVisualizer from "./ThreadingProgressVisualizer";

interface Props {
    imgXPos: number
    imgYPos: number
    imgScale: number
    image: HTMLImageElement | null
    setNailSequence: React.Dispatch<React.SetStateAction<number[]>>
    setFinalStringArt: Dispatch<SetStateAction<ImageData | null>>  
    numOfNails: number
    stringWeight: number
    maxLineCount: number
}
function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const ThreadingCanvas: React.FC<Props> = (props: Props) => {
    const { 
        imgXPos, 
        imgYPos, 
        imgScale, 
        image, 
        setNailSequence,  
        setFinalStringArt,
        numOfNails, 
        stringWeight, 
        maxLineCount 
    } = props
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D>()
    const [count, setCount] = useState<number>(0)
    const [downloadDisabled, setDownloadDisabled] = useState<boolean>(true)
    const [viewedImage, setViewedImage] = useState<ImageData | null>(null)
    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            canvas.width = DEFAULT_CANVAS_WIDTH;
            canvas.height = DEFAULT_CANVAS_HEIGHT;
            const ctx = canvas.getContext("2d");
            if (ctx != null) {
                setContext(ctx)
            }
        }
    }, [])
    useEffect(() => {
        if (viewedImage) {
            setDownloadDisabled(false)
            setFinalStringArt(viewedImage)
        } else {
            setDownloadDisabled(true)
            setFinalStringArt(null)
        }
    }, [viewedImage])
    useEffect(() => {
        if (context && image) {
            const canvasWidth = DEFAULT_CANVAS_WIDTH * imgScale;
            const canvasHeight = DEFAULT_CANVAS_HEIGHT * imgScale;

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

    async function startThreading() {
        if (context && canvasRef.current && image) {
            const dataURL = canvasRef.current.toDataURL();
            const newImage = new Image();
            newImage.src = dataURL;
            await sleep(100)
            context.globalCompositeOperation = 'source-over';
            context.drawImage(newImage, 0, 0);
            let algorithm = new ThreadingGreedyAlgorithm()
            await algorithm.startThreading("string_art", newImage, setCount, setNailSequence, setViewedImage, numOfNails, maxLineCount, stringWeight)
        }
    }

    const circleCrop = (context: CanvasRenderingContext2D) => {
        const startX = Math.floor((DEFAULT_CANVAS_WIDTH / 2) - 1);
        const startY = Math.floor((DEFAULT_CANVAS_HEIGHT / 2) - 1);
        context.beginPath();
        context.arc(startX, startY, 249, 0, Math.PI * 2);
        context.closePath();
        context.fill();
    }
    return (
        <div className="relative flex flex-col items-center space-y-4">
            <canvas ref={canvasRef} id="string_art" className="border-2 border-gray-300 rounded-2xl" />
            <ThreadingProgressVisualizer count={count} maxLineCount={maxLineCount}/>
            <button
                onClick={() => startThreading()}
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all"
            >
                Start Threading
            </button>
            <ImageDownloader image={viewedImage} downloadDisabled={downloadDisabled}/>
        </div>
    );
};

export default ThreadingCanvas;
