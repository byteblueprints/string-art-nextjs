"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Downloader from "./Downloader";
import Controls from "./Controls";
import { circleCrop, drawImageOnCanvasWithOffset, getContext } from "@/app/utils/canvas_operations";

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
    setStringArtInProgress: React.Dispatch<React.SetStateAction<boolean>>
    stringArtInProgress: boolean
}


const Canvas: React.FC<Props> = (props: Props) => {
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
        setStringArtInProgress,
        stringArtInProgress
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
            const centerX = (canvas.clientWidth / 2);
            const centerY = (canvas.clientHeight / 2);
            const radius = Math.min(canvas.clientWidth, canvas.clientHeight) / 2;

            drawImageOnCanvasWithOffset(canvas, image, imgXPos, imgYPos, imgScale);
            circleCrop(canvas, centerX, centerY, radius);
        }
    }, [imgXPos, imgYPos, imgScale, image]);
    return (
        <>
            <div className="relative flex flex-col h-full items-center">
                <div className="relative h-full w-[95%] border-2 border-gray-300 rounded-2xl">
                    <canvas ref={canvasRef} id="string_art" className="absolute h-full aspect-square top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute top-5 right-5">
                        <Downloader image={viewedImage} downloadDisabled={downloadDisabled} />
                    </div>
                </div>
                <div className="absolute w-[85%] bottom-0 left-1/2 transform -translate-x-1/2  translate-y-[120%]">
                    <Controls
                        maxLineCount={maxLineCount}
                        canvasRef={canvasRef}
                        setNailSequence={setNailSequence}
                        setViewedImage={setViewedImage}
                        numOfNails={numOfNails}
                        stringWeight={stringWeight}
                        setStringArtInProgress={setStringArtInProgress}
                        stringArtInProgress={stringArtInProgress}
                    />
                </div>
            </div>
        </>
    );
};

export default Canvas;
