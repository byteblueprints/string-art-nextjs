"use client";

import { useContext, useEffect, useRef, useState } from "react";
import Downloader from "./Downloader";
import Controls from "./Controls";
import { circleCrop, drawImageOnCanvasWithOffset } from "@/app/utils/CanvasOperations";
import { AppContext } from "@/app/context_provider";

const Canvas: React.FC = () => {
    const { state, updateState } = useContext(AppContext);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [downloadDisabled, setDownloadDisabled] = useState<boolean>(true)
    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
        }
    }, [])
    useEffect(() => {
        if (state.finalStringArt) {
            setDownloadDisabled(false)
            updateState((prev) => ({
                ...prev,
                finalStringArt: state.finalStringArt,
            }));
        } else {
            setDownloadDisabled(true)
        }
    }, [state.finalStringArt])

    useEffect(() => {
        if (canvasRef.current && state.selectedImage) {
            const canvas = canvasRef.current;
            const centerX = (canvas.clientWidth / 2);
            const centerY = (canvas.clientHeight / 2);
            const radius = Math.min(canvas.clientWidth, canvas.clientHeight) / 2;

            drawImageOnCanvasWithOffset(canvas, state.selectedImage, state.imgXPos, state.imgYPos, state.imgScale);
            circleCrop(canvas, centerX, centerY, radius);
        }
    }, [state.imgXPos, state.imgYPos, state.imgScale, state.selectedImage]);
    return (
        <>
            <div className="relative flex flex-col h-full items-center">
                <div className="relative h-full w-[95%] border-2 border-gray-300 rounded-2xl">
                    <canvas ref={canvasRef} id="string_art" className="absolute h-full aspect-square top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute top-5 right-5">
                        <Downloader downloadDisabled={downloadDisabled} />
                    </div>
                </div>
                <div className="absolute w-[85%] bottom-0 left-1/2 transform -translate-x-1/2  translate-y-[120%]">
                    <Controls
                        canvasRef={canvasRef}
                    />
                </div>
            </div>
        </>
    );
};

export default Canvas;
