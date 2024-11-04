"use client";

import { drawZoomedImageOnCanvas } from "@/app/utils/canvas_operations";
import { useEffect, useRef } from "react";

interface Props {
    selectedImage: HTMLImageElement | null
}
const PreviewCanvas: React.FC<Props> = (props: Props) => {
    const { selectedImage } = props
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (selectedImage && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
    
            if (ctx) {
                drawZoomedImageOnCanvas(canvas, selectedImage, 0.4);
            }
        }
    }, [selectedImage]);
    return (
        <div className="absolute h-full aspect-square top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <canvas ref={canvasRef} className="w-full h-full rounded-2xl"/>
        </div>
    );
};

export default PreviewCanvas;
