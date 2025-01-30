import { WorkingStatus } from "../types/enum/WorkingStatus";
import { MIN_DISTANCE, STORE_NAME_FOR_ALL_LINES } from "../utils/Constants";
import { BresenhamAlgorithm } from "./BresenhamAlgorithm";
import { Storage } from "./Storage";

export class Lines {
  public async storeAllPosibleLineCordinates(nailsCordinates: Array<[number, number]>, callback: (progress: any) => void) {
    const lineStorage = new Storage(STORE_NAME_FOR_ALL_LINES)
    let counter = 0;
    const numOfNails = nailsCordinates.length;
    let lineCoordinates: { [key: string]: Array<[number, number]> } | null = {};

    for (let i = 0; i < numOfNails; i++) {
      lineCoordinates = {}
      let count = 0;
      for (let j = MIN_DISTANCE; count < numOfNails - MIN_DISTANCE; j++) {
        const endNail = (i + j) % numOfNails;

        const lineVector = this.getLineCoordinatesAsVector(nailsCordinates[i][0], nailsCordinates[i][1], nailsCordinates[endNail][0], nailsCordinates[endNail][1]);

        lineCoordinates[`${i}_${endNail}`] = lineVector;
        lineCoordinates[`${endNail}_${i}`] = lineVector;

        counter++;
        count++;
      }
      await lineStorage.put(`${i}`, lineCoordinates);
      callback({ lines: lineCoordinates 
        ? Object.values(lineCoordinates).flatMap(coordinatesArray => coordinatesArray) 
        : [], key: `${i}`, status: WorkingStatus.INPROGRESS, calculateLineCount: counter })
      lineCoordinates = null
    }
  }

  private getLineCoordinatesAsVector(x0: number, y0: number, x1: number, y1: number): Array<[number, number]> {
    const bresenham = new BresenhamAlgorithm();
    return bresenham.getCoordinates(x0, y0, x1, y1);
  }
}
