import { CurrentStatus } from "../types/enum/CurrentStatus";
import { LinePreCalculatingWorkerResponse, LinePreCalculatingWorkerMsg } from "../types/WorkerMessages";
import { MIN_DISTANCE } from "../utils/constants";

export class LinesPreCalculator {
    private xc: number = 250;
    private yc: number = 250;
    private r: number = 250;

    public async startThreading(
        nailCount: number,
        setLineCalculated: React.Dispatch<React.SetStateAction<boolean>>,
        setPreCalcLineCount: React.Dispatch<React.SetStateAction<number>>
    ) {
        let allPosibleCombinations = (nailCount * nailCount) - (nailCount * MIN_DISTANCE)
        const linePreCalculatingWorker = new Worker(new URL("../workers/LinePreCalculate.Worker.ts", import.meta.url));
        const linePreCalculatingWorkerMsg: LinePreCalculatingWorkerMsg = { xc: this.xc, yc: this.yc, r: this.r, nailCount: nailCount }

        linePreCalculatingWorker.postMessage(linePreCalculatingWorkerMsg);

        linePreCalculatingWorker.onmessage = async function (e) {
            const calculateLinMsgFromWorker: LinePreCalculatingWorkerResponse = e.data
            if (calculateLinMsgFromWorker.status == CurrentStatus.INPROGRESS) {
                setPreCalcLineCount(calculateLinMsgFromWorker.count)
                if (calculateLinMsgFromWorker.count >= allPosibleCombinations) {
                    setLineCalculated(true)
                    linePreCalculatingWorker.terminate()
                }
            }
        };
    }
}

