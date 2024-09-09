"use client";

import { useEffect, useRef } from "react";

const ImagePreviewCanvasMask: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            canvas.width = 500;
            canvas.height = 500;
            const ctx = canvas.getContext("2d");
            const startX = Math.floor(500 / 2 - 1);
            const startY = Math.floor(500 / 2 - 1);

            if (ctx != null) {
                ctx.fillStyle = 'black';
                ctx.fillRect(0, 0, 500, 500);
                ctx.beginPath();
                ctx.arc(startX, startX, 249, 0, 2 * Math.PI);
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
    }, []);
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <canvas ref={canvasRef} className="rounded-2xl"/>
        </div>
    );
};

export default ImagePreviewCanvasMask;
