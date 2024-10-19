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
    setThreddingInProgress: React.Dispatch<React.SetStateAction<boolean>>
    threddingInProgress: boolean
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
        maxLineCount,
        setThreddingInProgress,
        threddingInProgress
    } = props
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [downloadDisabled, setDownloadDisabled] = useState<boolean>(true)
    const [viewedImage, setViewedImage] = useState<ImageData | null>(null)
    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
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
            const canvas = canvasRef.current;
            const ctx = canvasRef.current.getContext("2d");
            if (ctx != null) {
                const canvasWidth = canvas.clientWidth * imgScale;
                const canvasHeight = canvas.clientHeight * imgScale;

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

                circleCrop(ctx, canvas);
            }
        }
    }, [imgXPos, imgYPos, imgScale, image]);

    const circleCrop = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        const startX = (canvas.clientWidth / 2);
        const startY = (canvas.clientHeight / 2);
        const radius = Math.min(canvas.clientWidth, canvas.clientHeight) / 2 - 1;
        context.beginPath();
        context.arc(startX, startY, radius, 0, Math.PI * 2);
        context.closePath();
        context.fill();
    }
    return (
        <>
            <div className="relative flex flex-col h-full items-center">
                <div className="relative h-full w-[95%] border-2 border-gray-300 rounded-2xl">
                    <canvas ref={canvasRef} id="string_art" className="absolute h-full aspect-square top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute top-5 right-5">
                        <ImageDownloader image={viewedImage} downloadDisabled={downloadDisabled} />
                    </div>
                </div>
                <div className="absolute w-[85%] bottom-0 left-1/2 transform -translate-x-1/2  translate-y-[120%]">
                    <Threadder
                        maxLineCount={maxLineCount}
                        canvasRef={canvasRef}
                        setNailSequence={setNailSequence}
                        setViewedImage={setViewedImage}
                        numOfNails={numOfNails}
                        stringWeight={stringWeight}
                        setThreddingInProgress={setThreddingInProgress}
                        threddingInProgress={threddingInProgress}
                    />
                </div>
            </div>
        </>
    );
};

export default ThreadingCanvas;
