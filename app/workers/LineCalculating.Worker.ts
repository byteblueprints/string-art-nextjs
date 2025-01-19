import { WorkingStatus } from "../types/enum/WorkingStatus";
import { LinePreCalculatingWorkerMsg } from "../types/WorkerMessages";
import { Lines } from "../algorithm/Lines";
import { NailsCoordinatesCalculator } from "../algorithm/NailsCoordinatesCalculator";
import { Storage } from "../algorithm/Storage";

const lineStorage = new Storage("lines")
const nailStorage = new Storage("nails")

self.onmessage = async (event) => {
  await lineStorage.clearObjectStore();
  await nailStorage.clearObjectStore();
  const data: LinePreCalculatingWorkerMsg = event.data;

  if (data.xc !== undefined && data.yc !== undefined && data.r !== undefined && data.nailCount !== undefined) {
    const calculator = new NailsCoordinatesCalculator(data.xc, data.yc, data.r);
    const nailsCoordinates = calculator.getNailsCoordinates(data.nailCount);
    await nailStorage.store("nailCoordinates", nailsCoordinates);
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
          lines: progress.lines
        })
      } 
    });
  } else {
    self.postMessage({ message: "Invalid data provided to worker" });
  }
};

