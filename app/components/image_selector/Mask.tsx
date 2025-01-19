"use client";

import { markCenterPointWithCross } from "@/app/utils/CanvasOperations";
import { useEffect, useRef } from "react";

const Mask: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;            
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            const startX = canvas.width / 2;
            const startY = canvas.height / 2;
            markCenterPointWithCross(canvas, startX, startY);
        }
    }, []);

    return (
        <div className="absolute h-full aspect-square top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <canvas ref={canvasRef} className="w-full h-full rounded-2xl" />
        </div>
    );
};

export default Mask;
