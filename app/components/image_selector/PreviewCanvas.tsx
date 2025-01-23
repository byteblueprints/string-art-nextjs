"use client";

import { AppContext } from "@/app/context_provider";
import { drawImageOnCanvas, getContext } from "@/app/utils/CanvasOperations";
import { useContext, useEffect, useRef } from "react";

const PreviewCanvas: React.FC = () => {
    const { state } = useContext(AppContext);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (state.selectedImage && canvasRef.current) {
            const canvas = canvasRef.current;
            drawImageOnCanvas(canvas, state.selectedImage, 0.4);
        }
    }, [state.selectedImage]);
    return (
        <div className="absolute h-full aspect-square top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <canvas ref={canvasRef} className="w-full h-full rounded-2xl" />
        </div>
    );
};

export default PreviewCanvas;
