import { CalculateLineMsgToWorker } from "../types/worker_messages";
import { LineConnections } from "./LineConnections";
import { NailsCoordinatesCalculator } from "./NailsCoordinatesCalculator";

const ctx: Worker = self as any;

ctx.addEventListener("message", (event) => {
  console.log("Recieved message to lineCalculateWorker")
  const data: CalculateLineMsgToWorker = event.data;

  if (data.xc !== undefined && data.yc !== undefined && data.r !== undefined && data.num_of_nails !== undefined) {
    const calculator = new NailsCoordinatesCalculator(data.xc, data.yc, data.r);
    const nailsCoordinates = calculator.getNailsCoordinates(data.num_of_nails);

    const lineConnections = new LineConnections();
    const allLineCoordinates = lineConnections.getAllPossibleLinesCoordinatesAgainstConnection(nailsCoordinates);

    console.log("lineCalculateWorker Job done posting result to main thread")
    ctx.postMessage({
      message: "Worker done work!",
      nailsCoordinates,
      allLineCoordinates
    });
  } else {
    ctx.postMessage({ message: "Invalid data provided to worker" });
  }
});

export default null as any;

