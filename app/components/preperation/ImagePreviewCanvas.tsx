"use client";

import { useEffect, useRef } from "react";
import { useTransformEffect } from "react-zoom-pan-pinch";

interface Props {
    setImage: React.Dispatch<React.SetStateAction<HTMLImageElement | null>>
    selectedImage: HTMLImageElement | null
}
const ImagePreviewCanvas: React.FC<Props> = (props: Props) => {
    const { setImage, selectedImage } = props
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useTransformEffect(({ state, instance }) => {
        console.log("In Preview canvas", state.positionX, ", ", state.positionY); // { previousScale: 1, scale: 1, positionX: 0, positionY: 0 }

        return () => {
            // unmount
        };
    });
    useEffect(() => {
        if (selectedImage) {
            if (canvasRef.current) {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext("2d");

                if (ctx != null) {
                    const canvasWidth = 500;
                    const canvasHeight = 500;

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
                    setImage(selectedImage);
                }
            }
        }
        else {
            const image = new Image();
            image.src = "/base.jpeg";
            if (canvasRef.current) {
                const canvas = canvasRef.current;
                canvas.width = 500;
                canvas.height = 500;
                const ctx = canvas.getContext("2d");
                image.onload = () => {
                    if (ctx != null) {
                        ctx.globalAlpha = 0.2;
                        ctx.drawImage(image, 0, 0);
                        setImage(image)
                    }
                };
            }
        }
    }, [selectedImage]);
    return (
        <div className="flex flex-col w-full items-center justify-center">
            <canvas ref={canvasRef} width={500} height={500} className="rounded-2xl"/>
        </div>
    );
};

export default ImagePreviewCanvas;
