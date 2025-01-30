import { WorkingStatus } from "../types/enum/WorkingStatus";
import { LinePreCalculatingWorkerMsg } from "../types/WorkerMessages";
import { Lines } from "../algorithm/Lines";
import { NailsCoordinatesCalculator } from "../algorithm/NailsCoordinatesCalculator";
import { Storage } from "../algorithm/Storage";
import { STORE_KEY_NAME_FOR_NAIL_CORDINATES, STORE_NAME_FOR_ALL_LINES, STORE_NAME_FOR_NAILS } from "../Constants";

const lineStorage = new Storage(STORE_NAME_FOR_ALL_LINES)
const nailStorage = new Storage(STORE_NAME_FOR_NAILS)

self.onmessage = async (event) => {
  await lineStorage.clearObjectStore();
  await nailStorage.clearObjectStore();
  const data: LinePreCalculatingWorkerMsg = event.data;

  if (data.xc !== undefined && data.yc !== undefined && data.r !== undefined && data.nailCount !== undefined) {
    const calculator = new NailsCoordinatesCalculator(data.xc, data.yc, data.r);
    const nailsCoordinates = calculator.getNailsCoordinates(data.nailCount);
    await nailStorage.put(STORE_KEY_NAME_FOR_NAIL_CORDINATES, nailsCoordinates);
    self.postMessage({
      message: "Calculating nail cordinates completed"
    })

    const lineConnections = new Lines();
    lineConnections.storeAllPosibleLineCordinates(nailsCoordinates, async (progress) => {
      if (progress.status == WorkingStatus.INPROGRESS) {
        self.postMessage({
          message: "Line precalculating inprogress! " + progress.calculateLineCount,
          count: progress.calculateLineCount,
          status: WorkingStatus.INPROGRESS,
        })
      } 
    });
  } else {
    self.postMessage({ message: "Invalid data provided to worker" });
  }
};

