"use client";

import { useEffect, useRef } from "react";

interface Props {
    setImage: React.Dispatch<React.SetStateAction<HTMLImageElement | null>>
}
const ImagePreviewCanvas: React.FC<Props> = (props: Props) => {
    const { setImage } = props
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const image = new Image();
        image.src = "/base.jpg";
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
    }, []);
    return (
        <>
            <canvas ref={canvasRef} />
        </>
    );
};

export default ImagePreviewCanvas;
