import { CurrentStatus } from "../types/enum/CurrentStatus";
import { StringArtWorkerMsg } from "../types/WorkerMessages";
import { LineSolver } from "../algorithm/GreedyBestLineFinder";
import { Storage } from "../algorithm/Storage";


const nailStorage = new Storage("nails")
self.onmessage = async (event) => {
  const data: StringArtWorkerMsg = event.data;

  
  const lineSolver = new LineSolver();
  const nailsCordinates = await nailStorage.getByKey("nailCoordinates");

  await lineSolver.solveIterativelyWithLineScores(
    data.imageData,
    data.maxLineCount,
    data.height,
    data.width,
    nailsCordinates,
    data.outputScalingFactor,
    data.stringWeight,
    data.skip,
    (progress) => {
      if (progress.status == CurrentStatus.INPROGRESS) {
        if (progress.image == undefined) {
          self.postMessage({
            message: "String art inprogress!",
            count: progress.count,
            status: CurrentStatus.INPROGRESS
          });
        } else {
          self.postMessage({
            message: "String art inprogress!",
            imageData: progress.image,
            status: CurrentStatus.INPROGRESS,
            error:progress.error
          });
        }
      } else if (progress.status == CurrentStatus.COMPLETED) {
        self.postMessage({
          message: "Worker done work!",
          imageData: progress.image,
          nailSequence: progress.nailSequence,
          status: CurrentStatus.COMPLETED
        });
      }
    }
  );
};

