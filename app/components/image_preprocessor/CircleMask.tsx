"use client";

import { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH } from "@/app/utils/constants";
import { useEffect, useRef } from "react";

const CircleMask: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const markCenterPoint = (ctx: CanvasRenderingContext2D | null, canvas: HTMLCanvasElement, startX: number, startY: number) => {
        if (ctx != null) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.arc(startX, startX, (canvas.width / 2) - 1, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fillStyle = 'white';
            ctx.fill();
            for (let x = startX; x < startX + 3; x++) {
                for (let y = startY; y < startY + 3; y++) {
                    const imageData = ctx.getImageData(x, y, 1, 1);
                    const data = imageData.data;

                    data[0] = 255;
                    data[1] = 0;
                    data[2] = 0;
                    data[3] = 255;

                    ctx.putImageData(imageData, x, y);
                }
            }
        }
    }
    
    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            canvas.width = DEFAULT_CANVAS_WIDTH;
            canvas.height = DEFAULT_CANVAS_HEIGHT;
            const ctx = canvas.getContext("2d");
            const startX = Math.floor((canvas.width / 2) - 1);
            const startY = Math.floor((canvas.height / 2) - 1);
            markCenterPoint(ctx, canvas, startX, startY);
        }
    }, []);
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <canvas ref={canvasRef} className="rounded-2xl" />
        </div>
    );
};

export default CircleMask;
