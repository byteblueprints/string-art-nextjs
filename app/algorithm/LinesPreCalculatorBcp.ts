// import Pica from 'pica';
// import { Dispatch, SetStateAction } from "react";
// import { LinePreCalculatingWorkerResponse, LinePreCalculatingWorkerMsg, LineSolverMsgFromWorker, LineSolverMsgToWorker } from "../types/WorkerMessages";
// import { CurrentStatus } from '../types/enum/CurrentStatus';
// import { Storage } from './Storage';

// function sleep(ms: number): Promise<void> {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }
// export class LinesPreCalculator {
//     private xc: number = 250;
//     private yc: number = 250;
//     private r: number = 250;

//     public async startThreading(
//         canvasId: string,
//         image: HTMLImageElement | null,
//         setCount: React.Dispatch<React.SetStateAction<number>>,
//         num_of_nails: number,
//         setNailsCordinates: React.Dispatch<React.SetStateAction<[] | [number, number][]>>,
//         setStatus: React.Dispatch<React.SetStateAction<CurrentStatus>>,
//         localStorage: globalThis.Storage,
//         storage: Storage,
//         setLineCalculated: React.Dispatch<React.SetStateAction<boolean>>
//     ) {
//         let canvas: HTMLCanvasElement = document.getElementById(canvasId) as HTMLCanvasElement;
//         let ctx: CanvasRenderingContext2D | null = null
//         let imageData: ImageData;
//         let nailSeq: number[] = [];
//         let allLineCoordinates = {}
//         let self = this
//         let x = 0
//         if (canvas) {
//             ctx = canvas.getContext('2d');
//             if (ctx && image) {
//                 ctx.clearRect(0, 0, canvas.width, canvas.height);
//                 ctx.globalCompositeOperation = 'source-over';
//                 ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

//                 imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//                 ctx.globalCompositeOperation = 'destination-in';
//                 ctx.beginPath();
//                 ctx.arc(Math.floor(500 / 2 - 1), Math.floor(500 / 2 - 1), this.r, 0, Math.PI * 2);
//                 ctx.closePath();
//                 ctx.fill();

//                 this.convertToGrayscale(imageData);

//                 ctx.putImageData(imageData, 0, 0);
//                 ctx.globalCompositeOperation = 'destination-in';
//                 ctx.beginPath();
//                 ctx.arc(Math.floor(500 / 2 - 1), Math.floor(500 / 2 - 1), this.r, 0, Math.PI * 2);
//                 ctx.closePath();
//                 ctx.fill();
//                 ctx.globalCompositeOperation = 'source-over';

//                 console.log("Started working with web workers")
//                 const lineCalculateWorker = new Worker(new URL("./WorkerForCalculateLines.ts", import.meta.url));
//                 const calculateLinMsgToWorker: LinePreCalculatingWorkerMsg = { xc: this.xc, yc: this.yc, r: this.r, num_of_nails: num_of_nails }

//                 console.log("Started post message to lineCalculateWorker")
//                 lineCalculateWorker.postMessage(calculateLinMsgToWorker);
//                 storage.clearObjectStore("string_art");
//                 lineCalculateWorker.onmessage = async function (e) {
//                     // console.log("Recieved lineCalculateWorker posted message", e)
//                     const calculateLinMsgFromWorker: LinePreCalculatingWorkerResponse = e.data
//                     if (calculateLinMsgFromWorker.status == CurrentStatus.INPROGRESS) {
//                         const nailsCoordinates = calculateLinMsgFromWorker.nailsCoordinates;
//                         const lines = calculateLinMsgFromWorker.lines;
//                         if (nailsCoordinates != undefined && nailsCoordinates != null && nailsCoordinates.length > 0) {
//                             if (ctx) {
//                                 self.drawNails(calculateLinMsgFromWorker.nailsCoordinates, ctx);
//                             }
//                             await storage.appendToMatrixInIndexedDB2(calculateLinMsgFromWorker.nailsCoordinates, setCount, "nc");
//                             setCount(calculateLinMsgFromWorker.count)
//                         } else  {
//                             await storage.appendToMatrixInIndexedDB(calculateLinMsgFromWorker.allLineCoordinates, setCount, calculateLinMsgFromWorker.key);
//                             if (calculateLinMsgFromWorker.key == '229') {
//                                 setLineCalculated(true)
//                             }
//                         }
//                     }
//                     else if (calculateLinMsgFromWorker.status == CurrentStatus.COMPLETED) {
//                         console.log("Completed", e)
//                         setStatus(CurrentStatus.COMPLETED)
//                     }
//                 };
//             }
//         }
//         return { nailSeq, allLineCoordinates };
//     }
//     private convertToGrayscale(imageData: ImageData) {
//         const data = imageData.data;

//         for (let i = 0; i < data.length; i += 4) {
//             const r = data[i];
//             const g = data[i + 1];
//             const b = data[i + 2];

//             const gray = 0.21 * r + 0.72 * g + 0.07 * b;
//             data[i] = gray;
//             data[i + 1] = gray;
//             data[i + 2] = gray;
//         }
//     }

//     public drawNails(nailsCordinates: [number, number][], ctx: CanvasRenderingContext2D) {
//         nailsCordinates.forEach(([xx, yy]) => {
//             for (let x = xx; x < xx + 2; x++) {
//                 for (let y = yy; y < yy + 2; y++) {
//                     if (ctx) {
//                         const pixelData = ctx.createImageData(1, 1);
//                         pixelData.data[0] = 255;
//                         pixelData.data[1] = 0;
//                         pixelData.data[2] = 0;
//                         pixelData.data[3] = 255;
//                         ctx.putImageData(pixelData, x, y);
//                     }
//                 }
//             };
//         });
//     }
// }

