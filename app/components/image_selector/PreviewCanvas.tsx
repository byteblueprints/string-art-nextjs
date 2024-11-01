"use client";

import { useEffect, useRef } from "react";

interface Props {
    selectedImage: HTMLImageElement | null
}
const PreviewCanvas: React.FC<Props> = (props: Props) => {
    const { selectedImage } = props
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (selectedImage) {
            if (canvasRef.current) {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext("2d");

                if (ctx != null) {
                    const canvasWidth = canvas.clientWidth;
                    const canvasHeight = canvas.clientHeight;

                    const imageAspectRatio = selectedImage.width / selectedImage.height;
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

                    const xOffset = (canvasWidth - drawWidth) / 2;
                    const yOffset = (canvasHeight - drawHeight) / 2;

                    canvas.width = canvasWidth;
                    canvas.height = canvasHeight;

                    ctx.globalAlpha = 0.4;
                    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                    ctx.drawImage(selectedImage, xOffset, yOffset, drawWidth, drawHeight);
                }
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
