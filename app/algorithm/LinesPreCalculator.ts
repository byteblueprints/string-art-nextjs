import { WorkingStatus } from "../types/enum/WorkingStatus";
import { LinePreCalculatingWorkerResponse, LinePreCalculatingWorkerMsg } from "../types/WorkerMessages";
import { MIN_DISTANCE } from "../Constants";

export class LinesPreCalculator {

    public async preCalculateAllLines(
        nailCount: number,
        setLineCalculated: React.Dispatch<React.SetStateAction<boolean>>,
        setPreCalcLineCount: React.Dispatch<React.SetStateAction<number>>,
        xc: number,
        yc: number,
        r: number,
    ) {
        let allPosibleCombinations = (nailCount * nailCount) - (nailCount * MIN_DISTANCE)
        const linePreCalculatingWorker = new Worker(new URL("../workers/LineCalculating.Worker.ts", import.meta.url));
        const linePreCalculatingWorkerMsg: LinePreCalculatingWorkerMsg = { xc: xc, yc: yc, r: r, nailCount: nailCount }

        linePreCalculatingWorker.postMessage(linePreCalculatingWorkerMsg);

        linePreCalculatingWorker.onmessage = async function (e) {
            const calculateLinMsgFromWorker: LinePreCalculatingWorkerResponse = e.data
            if (calculateLinMsgFromWorker.status == WorkingStatus.INPROGRESS) {
                setPreCalcLineCount(calculateLinMsgFromWorker.count)
                if (calculateLinMsgFromWorker.count >= allPosibleCombinations) {
                    setLineCalculated(true)
                    linePreCalculatingWorker.terminate()
                }
            }
        };
    }
}

