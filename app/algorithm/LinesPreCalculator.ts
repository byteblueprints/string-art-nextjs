import { LinePreCalculatingWorkerResponse, LinePreCalculatingWorkerMsg } from "../types/WorkerMessages";

export class LinesPreCalculator {
    private xc: number = 250;
    private yc: number = 250;
    private r: number = 250;

    public async startThreading(
        nailCount: number,
        setLineCalculated: React.Dispatch<React.SetStateAction<boolean>>
    ) {
        console.log("Started working with web workers")
        const linePreCalculatingWorker = new Worker(new URL("../workers/LinePreCalculate.Worker.ts", import.meta.url));
        const linePreCalculatingWorkerMsg: LinePreCalculatingWorkerMsg = { xc: this.xc, yc: this.yc, r: this.r, nailCount: nailCount }

        console.log("Started post message to lineCalculateWorker")
        linePreCalculatingWorker.postMessage(linePreCalculatingWorkerMsg);

        linePreCalculatingWorker.onmessage = async function (e) {
            const calculateLinMsgFromWorker: LinePreCalculatingWorkerResponse = e.data
            console.log(calculateLinMsgFromWorker.message)
            setLineCalculated(true)
        };
    }
}

