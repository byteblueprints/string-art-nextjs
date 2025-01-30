import Pica from 'pica';
import { MANUAL_DRAW_PADDING } from './Constants';

const pica = Pica()

export const markCenterPointWithCross = (
    canvas: HTMLCanvasElement,
    startX: number,
    startY: number
): void => {
    const ctx = getContext(canvas);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const radius = Math.min(canvas.width, canvas.height) / 2;
    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.stroke();

    const crossSize = 10;

    ctx.beginPath();
    ctx.moveTo(startX - crossSize, startY);
    ctx.lineTo(startX + crossSize, startY);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(startX, startY - crossSize);
    ctx.lineTo(startX, startY + crossSize);
    ctx.stroke();

    const smallCircleRadius = 3;
    ctx.beginPath();
    ctx.arc(startX, startY, smallCircleRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
};

export const drawImageOnCanvas = (
    canvas: HTMLCanvasElement,
    image: HTMLImageElement,
    alpha: number
) => {
    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;

    const { drawWidth, drawHeight, xOffset, yOffset } = calculateDrawDimensionsWithOffsets(
        canvasWidth,
        canvasHeight,
        image.width,
        image.height
    );

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = getContext(canvas);
    ctx.globalAlpha = alpha;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(image, xOffset, yOffset, drawWidth, drawHeight);
};

export const drawImageOnCanvasWithOffset = (
    canvas: HTMLCanvasElement,
    image: HTMLImageElement,
    xOffset: number,
    yOffset: number,
    scale: number
) => {
    const ctx = getContext(canvas);

    const canvasWidth = canvas.clientWidth * scale;
    const canvasHeight = canvas.clientHeight * scale;

    const { drawWidth, drawHeight, xOffset: centerXOffset, yOffset: centerYOffset } = calculateDrawDimensionsWithOffsets(
        canvasWidth,
        canvasHeight,
        image.width,
        image.height
    );

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(
        image,
        centerXOffset + xOffset,
        centerYOffset + yOffset,
        drawWidth,
        drawHeight
    );
    ctx.globalCompositeOperation = 'destination-in';
};

export const calculateDrawDimensionsWithOffsets = (
    canvasWidth: number,
    canvasHeight: number,
    imageWidth: number,
    imageHeight: number
) => {
    const imageAspectRatio = imageWidth / imageHeight;
    const canvasAspectRatio = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;

    if (imageAspectRatio > canvasAspectRatio) {
        drawHeight = canvasWidth / imageAspectRatio;
    } else {
        drawWidth = canvasHeight * imageAspectRatio;
    }

    const xOffset = (canvasWidth - drawWidth) / 2;
    const yOffset = (canvasHeight - drawHeight) / 2;

    return { drawWidth, drawHeight, xOffset, yOffset };
};

export const circleCrop = (
    canvas: HTMLCanvasElement,
    centerX: number,
    centerY: number,
    radius: number
) => {
    const ctx = getContext(canvas);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
};


export const drawNailsWithNumbers = (nailsCordinates: [number, number][], canvas: HTMLCanvasElement) => {
    let count = 0;
    let i = 1;
    const ctx = getContext(canvas);
    nailsCordinates.forEach(([xx, yy]) => {
        for (let x = xx - 1; x < xx + 2; x++) {
            for (let y = yy - 1; y < yy + 2; y++) {
                if (ctx) {
                    const pixelData = ctx.createImageData(1, 1);
                    pixelData.data[0] = 255;
                    pixelData.data[1] = 0;
                    pixelData.data[2] = 0;
                    pixelData.data[3] = 255;
                    ctx.putImageData(pixelData, x, y);
                }
            }
        };
        if (count % 5 == 0) {
            ctx.font = "10px Arial";
            ctx.fillText("" + i, xx, yy);
        }
        count++;
        i++;
    });
}

export const setCSSDimentions = (canvas: HTMLCanvasElement) => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
};

export const createTempCanvas = (finalImage: ImageData) => {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = finalImage.width;
    tempCanvas.height = finalImage.height;
    const ctx = getContext(tempCanvas);
    if (ctx) {
        ctx.putImageData(finalImage, 0, 0);
    }
    return tempCanvas;
};

export const resizeImage = async (tempCanvas: HTMLCanvasElement, canvas: HTMLCanvasElement) => {
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = canvas.clientWidth;
    outputCanvas.height = canvas.clientHeight;
    const outputContext = getContext(canvas)
    return pica.resize(tempCanvas, outputCanvas, { quality: 3 })
        .then(() => {
            if (outputContext) {
                outputContext.globalCompositeOperation = 'source-over';
                outputContext.drawImage(
                    outputCanvas,
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );
            }
        })
        .finally(() => {
            outputCanvas.remove();
        });
};

export const resizeImageWithPadding = async (tempCanvas: HTMLCanvasElement, canvas: HTMLCanvasElement) => {
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = canvas.clientWidth;
    outputCanvas.height = canvas.clientHeight;
    const outputContext = getContext(canvas)
    return pica.resize(tempCanvas, outputCanvas, { quality: 3 })
        .then(() => {
            if (outputContext) {
                outputContext.globalCompositeOperation = 'source-over';
                outputContext.drawImage(
                    outputCanvas,
                    MANUAL_DRAW_PADDING,
                    MANUAL_DRAW_PADDING,
                    canvas.width - MANUAL_DRAW_PADDING * 2,
                    canvas.height - MANUAL_DRAW_PADDING * 2
                );
            }
        })
        .finally(() => {
            outputCanvas.remove();
        });
};

export const getContext = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        throw new Error("Failed to get 2D context from the canvas.");
    }
    return ctx;
}
