import { CurrentStatus } from "../types/enum/CurrentStatus";
import { LinePreCalculatingWorkerResponse, LinePreCalculatingWorkerMsg } from "../types/WorkerMessages";
function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export class LinesPreCalculator {
    private xc: number = 250;
    private yc: number = 250;
    private r: number = 250;

    public async startThreading(
        nailCount: number,
        setLineCalculated: React.Dispatch<React.SetStateAction<boolean>>,
        setPreCalcLineCount: React.Dispatch<React.SetStateAction<number>>
    ) {
        console.log("Started working with web workers")
        const linePreCalculatingWorker = new Worker(new URL("../workers/LinePreCalculate.Worker.ts", import.meta.url));
        const linePreCalculatingWorkerMsg: LinePreCalculatingWorkerMsg = { xc: this.xc, yc: this.yc, r: this.r, nailCount: nailCount }

        console.log("Started post message to lineCalculateWorker")
        linePreCalculatingWorker.postMessage(linePreCalculatingWorkerMsg);

        linePreCalculatingWorker.onmessage = async function (e) {
            const calculateLinMsgFromWorker: LinePreCalculatingWorkerResponse = e.data
            console.log(calculateLinMsgFromWorker.message)
            if (calculateLinMsgFromWorker.status == CurrentStatus.INPROGRESS) {
                console.log(calculateLinMsgFromWorker.count)
                setPreCalcLineCount(calculateLinMsgFromWorker.count)
                if (calculateLinMsgFromWorker.count >= 57500) {
                    setLineCalculated(true)
                    linePreCalculatingWorker.terminate()
                }
            }
        };
    }
}

