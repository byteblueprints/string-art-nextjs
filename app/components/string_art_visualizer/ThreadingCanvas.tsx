"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT } from "@/app/utils/constants";
import ImageDownloader from "./ImageDownloader";
import Threadder from "./Threadder";

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
    const [downloadDisabled, setDownloadDisabled] = useState<boolean>(true)
    const [viewedImage, setViewedImage] = useState<ImageData | null>(null)
    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            canvas.width = DEFAULT_CANVAS_WIDTH;
            canvas.height = DEFAULT_CANVAS_HEIGHT;
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
        if (canvasRef.current && image) {
            const ctx = canvasRef.current.getContext("2d");
            if (ctx != null) {
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

                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                ctx.globalAlpha = 1;
                ctx.globalCompositeOperation = 'source-over';
                ctx.drawImage(image, xOffset + imgXPos, yOffset + imgYPos, drawWidth, drawHeight);
                ctx.globalCompositeOperation = 'destination-in';

                circleCrop(ctx);
            }
        }
    }, [imgXPos, imgYPos, imgScale, image]);

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
            <Threadder  
            maxLineCount={maxLineCount} 
            canvasRef={canvasRef} 
            setNailSequence={setNailSequence}
            setViewedImage={setViewedImage}
            numOfNails={numOfNails}
            stringWeight={stringWeight}
            />
            <ImageDownloader image={viewedImage} downloadDisabled={downloadDisabled} />
        </div>
    );
};

export default ThreadingCanvas;
