import { CurrentStatus } from "../types/enum/CurrentStatus";
import { StringArtWorkerMsg } from "../types/WorkerMessages";
import { LineSolver } from "./LineSolverForWorker";
import { Storage } from "./Storage";

const ctx: Worker = self as any;

const nailStorage = new Storage("nails")
ctx.addEventListener("message", async (event) => {
  console.log("Recieved message to lineSolverWorker")
  const data: StringArtWorkerMsg = event.data;

  const {
    imageData,
    maxLineCount: max_line_count,
    height,
    width,
    outputScalingFactor: output_scaling_factor,
    stringWeight: string_weight,
    skip
  } = data;
  const lineSolver = new LineSolver();
  const nailsCordinates = await nailStorage.getByKey("nailCoordinates");
  if (nailsCordinates != null) {
    console.log("Unable to retrieve nailCordinates")
  }

  await lineSolver.solveIterativelyWithLineScores(
    imageData,
    max_line_count,
    height,
    width,
    nailsCordinates,
    output_scaling_factor,
    string_weight,
    skip,
    (progress) => {
      if (progress.status == CurrentStatus.INPROGRESS) {
        if (progress.image == undefined) {
          ctx.postMessage({
            message: "String art inprogress!",
            count: progress.count,
            status: CurrentStatus.INPROGRESS
          });
        } else {
          ctx.postMessage({
            message: "String art inprogress!",
            imageData: progress.image,
            status: CurrentStatus.INPROGRESS
          });
        }
      } else if (progress.status == CurrentStatus.COMPLETED) {
        ctx.postMessage({
          message: "Worker done work!",
          imageData: progress.image,
          status: CurrentStatus.COMPLETED
        });
      }
    }
  );
});

export default null as any;

