import { CurrentStatus } from "../types/enum/CurrentStatus";
import { LinePreCalculatingWorkerMsg } from "../types/WorkerMessages";
import { LineConnections } from "./LineConnections";
import { NailsCoordinatesCalculator } from "./NailsCoordinatesCalculator";
import { Storage } from "./Storage";

const ctx: Worker = self as any;
const lineStorage = new Storage("lines")
const nailStorage = new Storage("nails")

ctx.addEventListener("message", async (event) => {
  await lineStorage.clearObjectStore();
  await nailStorage.clearObjectStore();
  const data: LinePreCalculatingWorkerMsg = event.data;

  if (data.xc !== undefined && data.yc !== undefined && data.r !== undefined && data.nailCount !== undefined) {
    const calculator = new NailsCoordinatesCalculator(data.xc, data.yc, data.r);
    const nailsCoordinates = calculator.getNailsCoordinates(data.nailCount);
    await nailStorage.store("nailCoordinates", nailsCoordinates);
    ctx.postMessage({
      message: "Calculating nail cordinates completed"
    })

    const lineConnections = new LineConnections();
    lineConnections.getAllPossibleLinesCoordinatesAgainstConnection(nailsCoordinates, async (progress) => {
      if (progress.status == CurrentStatus.INPROGRESS) {
        await lineStorage.store(progress.key, progress.lineCoordinates);
      } else if (progress.status == CurrentStatus.COMPLETED) {
        ctx.postMessage({
          message: "Line precalculating completed!"
        })
      }
    });
  } else {
    ctx.postMessage({ message: "Invalid data provided to worker" });
  }
});

export default null as any;

