"use client";

import { DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT } from "@/app/utils/constants";
import { useEffect, useRef } from "react";

interface Props {
    selectedImage: HTMLImageElement | null
}
const ImagePreviewCanvas: React.FC<Props> = (props: Props) => {
    const { selectedImage } = props
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (selectedImage) {
            if (canvasRef.current) {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext("2d");

                if (ctx != null) {
                    const canvasWidth = DEFAULT_CANVAS_WIDTH;
                    const canvasHeight = DEFAULT_CANVAS_HEIGHT;

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
        <div className="flex flex-col w-full items-center justify-center">
            <canvas ref={canvasRef} className="rounded-2xl"/>
        </div>
    );
};

export default ImagePreviewCanvas;
