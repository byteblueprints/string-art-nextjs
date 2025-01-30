import { WorkingStatus } from "../types/enum/WorkingStatus";
import { StringArtWorkerMsg } from "../types/WorkerMessages";
import { GreedyBestLineFinder } from "../algorithm/GreedyBestLineFinder";
import { Storage } from "../algorithm/Storage";
import { STORE_KEY_NAME_FOR_NAIL_CORDINATES, STORE_NAME_FOR_NAILS } from "../utils/constants";


const nailStorage = new Storage(STORE_NAME_FOR_NAILS)
self.onmessage = async (event) => {
  const data: StringArtWorkerMsg = event.data;

  
  const lineSolver = new GreedyBestLineFinder();
  const nailsCordinates = await nailStorage.getByKey(STORE_KEY_NAME_FOR_NAIL_CORDINATES);

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
      if (progress.status == WorkingStatus.INPROGRESS) {
        if (progress.image == undefined) {
          self.postMessage({
            message: "String art inprogress!",
            count: progress.count,
            status: WorkingStatus.INPROGRESS
          });
        } else {
          self.postMessage({
            message: "String art inprogress!",
            imageData: progress.image,
            status: WorkingStatus.INPROGRESS,
            error:progress.error
          });
        }
      } else if (progress.status == WorkingStatus.COMPLETED) {
        self.postMessage({
          message: "Worker done work!",
          imageData: progress.image,
          nailSequence: progress.nailSequence,
          status: WorkingStatus.COMPLETED
        });
      }
    }
  );
};

