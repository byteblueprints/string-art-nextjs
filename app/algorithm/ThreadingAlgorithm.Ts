import { NailsCoordinatesCalculator } from "./NailsCoordinatesCalculator";
import { LineConnections } from "./LineConnections";
import { LineSolver } from "./LineSolver";
export class ThreadingAlgorithm {
    private xc: number = 250;
    private yc: number = 250;
    private r: number = 249;
    private num_of_nails: number = 288;
    private height: number = 500;
    private width: number = 500;
    private output_scaling_factor: number = 7;
    private string_weight: number = 20;
    private max_line_count: number = 4000;
    private skip: number = 20;

    private canvas: HTMLCanvasElement | null = null;
    private ctx: CanvasRenderingContext2D | null = null;

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        if (this.canvas) {
            this.ctx = this.canvas.getContext('2d');
        }
    }
    public async startThreading(image: HTMLImageElement | null, setCount: unknown, setNailSequence: unknown) {
        let imageData;
        let nailSeq: number[] = [];
        let allLineCoordinates = {}
        if (this.ctx) {
            if (this.canvas && image) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.globalCompositeOperation = 'source-over';
                this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);

                imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.globalCompositeOperation = 'destination-in';
                this.ctx.beginPath();
                this.ctx.arc(Math.floor(500 / 2 - 1), Math.floor(500 / 2 - 1), this.r, 0, Math.PI * 2);
                this.ctx.closePath();
                this.ctx.fill();
                const offscreenCanvas = new OffscreenCanvas(image.width, image.height);
                const ctx = offscreenCanvas.getContext('2d');

                this.convertToGrayscale(imageData);

                this.ctx.putImageData(imageData, 0, 0);
                this.ctx.globalCompositeOperation = 'destination-in';
                this.ctx.beginPath();
                this.ctx.arc(Math.floor(500 / 2 - 1), Math.floor(500 / 2 - 1), this.r, 0, Math.PI * 2);
                this.ctx.closePath();
                this.ctx.fill();
                this.ctx.globalCompositeOperation = 'source-over';

                const calculator = new NailsCoordinatesCalculator(this.xc, this.yc, this.r);
                const nailsCordinates = calculator.getNailsCoordinates(this.num_of_nails);

                this.drawNails(nailsCordinates);

                const lineConnections = new LineConnections();
                allLineCoordinates = lineConnections.getAllPossibleLinesCoordinatesAgainstConnection(nailsCordinates);

                const lineSolver = new LineSolver();
                nailSeq = await lineSolver.solveIterativelyWithLineScores(
                    allLineCoordinates,
                    imageData,
                    this.max_line_count,
                    this.height,
                    this.width,
                    nailsCordinates,
                    this.output_scaling_factor,
                    this.string_weight,
                    this.canvas,
                    this.skip,
                    setCount
                )
            }
            this.cleanup()
        }
        return {nailSeq, allLineCoordinates};
    }


    private drawNails(nc: [number, number][]) {
        nc.forEach(([xx, yy]) => {
            for (let x = xx; x < xx + 2; x++) {
                for (let y = yy; y < yy + 2; y++) {
                    if (this.ctx) {
                        const pixelData = this.ctx.createImageData(1, 1);
                        pixelData.data[0] = 255;
                        pixelData.data[1] = 0;
                        pixelData.data[2] = 0;
                        pixelData.data[3] = 255;
                        this.ctx.putImageData(pixelData, x, y);
                    }
                }
            };
        });
    }

    private convertToGrayscale(imageData: ImageData) {
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            const gray = 0.21 * r + 0.72 * g + 0.07 * b;

            data[i] = gray;
            data[i + 1] = gray;
            data[i + 2] = gray;
        }
    }
    private cleanup() {
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas?.width ?? 0, this.canvas?.height ?? 0);
        }
        this.canvas = null;
        this.ctx = null;
    }
}
