"use client";

import { useEffect, useRef } from "react";

const Mask: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const markCenterPoint = (
        ctx: CanvasRenderingContext2D | null,
        canvas: HTMLCanvasElement,
        startX: number,
        startY: number
    ) => {
        if (ctx != null) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const radius = Math.min(canvas.width, canvas.height) / 2 - 1;
            ctx.beginPath();
            ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.stroke();

            for (let x = startX - 1; x <= startX + 1; x++) {
                for (let y = startY - 1; y <= startY + 1; y++) {
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
    };

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;

            const startX = canvas.width / 2;
            const startY = canvas.height / 2;

            markCenterPoint(ctx, canvas, startX, startY);
        }
    }, []);

    return (
        <div className="absolute h-full aspect-square top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <canvas ref={canvasRef} className="w-full h-full rounded-2xl" />
        </div>
    );
};

export default Mask;
