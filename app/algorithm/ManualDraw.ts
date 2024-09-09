export class ManualDraw {
    drawLeft(nailSequense: any[], nailSequenseIndex: number, canvasRef: unknown, allLineCoordinates: object) {
        // throw new Error("Method not implemented.");
    }
    drawRight(nailSequense: any[], nailSequenseIndex: number, canvasRef: unknown, allLineCoordinates: { [key: string]: Array<[number, number]>; }) {
        // let key = nailSequense[nailSequenseIndex-1] + "_" + nailSequense[nailSequenseIndex]
        // const lineCoordinates = allLineCoordinates[key];
        // const startPoint = {
        //     x: lineCoordinates[startNail][0] * outputScalingFactor,
        //     y: lineCoordinates[startNail][1] * outputScalingFactor,
        // };
        // const endPoint = {
        //     x: lineCoordinates[bestNail][0] * outputScalingFactor,
        //     y: lineCoordinates[bestNail][1] * outputScalingFactor,
        // };
    }

    private canvas: HTMLCanvasElement | null = null;
    private ctx: CanvasRenderingContext2D | null = null;

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        if (this.canvas) {
            this.ctx = this.canvas.getContext('2d');
        }
    }
    private drawLineUsingBreshenHamLineDrawingAlgo(imageData: ImageData, startPoint: { x: number; y: number }, endPoint: { x: number; y: number }): ImageData {
        const { width, height, data } = imageData;

        const dx = Math.abs(endPoint.x - startPoint.x);
        const dy = Math.abs(endPoint.y - startPoint.y);
        const sx = startPoint.x < endPoint.x ? 1 : -1;
        const sy = startPoint.y < endPoint.y ? 1 : -1;
        let err = dx - dy;

        let x = startPoint.x;
        let y = startPoint.y;

        while (true) {
            if (x >= 0 && x < width && y >= 0 && y < height) {
                const index = (y * width + x) * 4;
                data[index] = 20;     // R
                data[index + 1] = 20; // G
                data[index + 2] = 20; // B
                data[index + 3] = 255; // A
            }

            if (x === endPoint.x && y === endPoint.y) break;

            const e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x += sx;
            }
            if (e2 < dx) {
                err += dx;
                y += sy;
            }
        }

        return imageData;
    }
    private showImage(outputContext: CanvasRenderingContext2D, imageData: ImageData): void {
        const canvas = document.createElement('canvas');
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        const ctx = canvas.getContext("2d");
        outputContext.putImageData(imageData, 0, 0);
    }
}