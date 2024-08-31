"use client";
import { useEffect, useRef, useState } from "react";
import { ThreadingAlgorithm } from '../../algorithm/ThreadingAlgorithm';

interface Props {
    imgXPos: number
    imgYPos: number
    imgScale: number
    image: HTMLImageElement | null
}

const ThreadingCanvas: React.FC<Props> = (props: Props) => {
    const { imgXPos, imgYPos, imgScale, image } = props
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D>()
    const [img, setImg] = useState<HTMLImageElement>()
    const startX = Math.floor(500 / 2 - 1);
    const startY = Math.floor(500 / 2 - 1);
    useEffect(() => {
        if (context != null && img != undefined) {
            context.clearRect(0, 0, 500, 500);
            context.globalAlpha = 1;
            context.globalCompositeOperation = 'source-over';
            context.drawImage(img, imgXPos, imgYPos, img.width * imgScale, img.height * imgScale);
            context.globalCompositeOperation = 'destination-in';
            context.beginPath();
            context.arc(startX, startY, 249, 0, Math.PI * 2);
            context.closePath();
            context.fill();
        }
    }, [imgXPos, imgYPos, imgScale])
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
                    setContext(ctx)
                    setImg(image)
                    ctx.globalAlpha = 1;
                    ctx.drawImage(image, 0, 0);
                    ctx.globalCompositeOperation = 'destination-in';
                    ctx.beginPath();
                    ctx.arc(startX, startY, 249, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.fill();
                }
            };
        }
    }, []);
    function startThreading(): void {
        if (context && canvasRef.current) {
            let algorithm = new ThreadingAlgorithm("string_art")
            algorithm.startThreading(image)
        }
    }

    return (
        <>
            <canvas ref={canvasRef} id="string_art" />
            <button onClick={() => startThreading()} style={{ color: "black" }}>
                Start Threading
            </button>
        </>
    );
};

export default ThreadingCanvas;
