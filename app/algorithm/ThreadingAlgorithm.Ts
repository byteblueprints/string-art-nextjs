import { NailsCoordinatesCalculator } from "./NailsCoordinatesCalculator";
import { LineConnections } from "./LineConnections";
import { LineSolver } from "./LineSolver";
import { Dispatch, SetStateAction } from "react";
export class ThreadingAlgorithm {
    private xc: number = 250;
    private yc: number = 250;
    private r: number = 250;
    private height: number = 500;
    private width: number = 500;
    private output_scaling_factor: number = 7;
    private skip: number = 20;

    public async startThreading(
        canvasId: string, 
        image: HTMLImageElement | null, 
        setCount: unknown, setNailSequence: React.Dispatch<React.SetStateAction<number[]>>, 
        setViewedImage: Dispatch<SetStateAction<ImageData | null>>,
        num_of_nails: number,
        max_line_count: number,
        string_weight: number
    ) {
        let canvas: HTMLCanvasElement = document.getElementById(canvasId) as HTMLCanvasElement;
        let ctx: CanvasRenderingContext2D | null = null
        let imageData;
        let nailSeq: number[] = [];
        let allLineCoordinates = {}
        if (canvas) {
            ctx = canvas.getContext('2d');
            if (ctx && image) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.globalCompositeOperation = 'source-over';
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

                imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                ctx.globalCompositeOperation = 'destination-in';
                ctx.beginPath();
                ctx.arc(Math.floor(500 / 2 - 1), Math.floor(500 / 2 - 1), this.r, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();

                this.convertToGrayscale(imageData);

                ctx.putImageData(imageData, 0, 0);
                ctx.globalCompositeOperation = 'destination-in';
                ctx.beginPath();
                ctx.arc(Math.floor(500 / 2 - 1), Math.floor(500 / 2 - 1), this.r, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
                ctx.globalCompositeOperation = 'source-over';

                const calculator = new NailsCoordinatesCalculator(this.xc, this.yc, this.r);
                const nailsCordinates = calculator.getNailsCoordinates(num_of_nails);

                this.drawNails(nailsCordinates, ctx);

                const lineConnections = new LineConnections();
                allLineCoordinates = lineConnections.getAllPossibleLinesCoordinatesAgainstConnection(nailsCordinates);

                const lineSolver = new LineSolver();
                nailSeq = await lineSolver.solveIterativelyWithLineScores(
                    allLineCoordinates,
                    imageData,
                    max_line_count,
                    this.height,
                    this.width,
                    nailsCordinates,
                    this.output_scaling_factor,
                    string_weight,
                    canvas,
                    this.skip,
                    setCount,
                    setViewedImage
                )
                setNailSequence(nailSeq)
                this.cleanup(ctx, canvas)
            }
        }
        return { nailSeq, allLineCoordinates };
    }


    private drawNails(nailsCordinates: [number, number][], ctx: CanvasRenderingContext2D) {
        nailsCordinates.forEach(([xx, yy]) => {
            for (let x = xx; x < xx + 2; x++) {
                for (let y = yy; y < yy + 2; y++) {
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
    private cleanup(ctx: CanvasRenderingContext2D | null, canvas: HTMLCanvasElement | null) {
        if (ctx && canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        canvas = null;
        ctx = null;
    }
}
