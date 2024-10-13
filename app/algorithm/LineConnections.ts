import { CurrentStatus } from "../types/enum/CurrentStatus";
import { MIN_DISTANCE } from "../utils/constants";
import { BresenhamLine } from "./BresenhamLine";
import { Storage } from "./Storage";

export class LineConnections {
  public async storeAllPosibleLineCordinates(nailsCordinates: Array<[number, number]>, callback: (progress: any) => void) {
    const lineStorage = new Storage("lines")
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
      await lineStorage.store(`${i}`, lineCoordinates);
      callback({ lineCoordinates: lineCoordinates, key: `${i}`, status: CurrentStatus.INPROGRESS, calculateLineCount: counter })
      lineCoordinates = null
    }
  }

  private getLineCoordinatesAsVector(x0: number, y0: number, x1: number, y1: number): Array<[number, number]> {
    const bresenham = new BresenhamLine();
    return bresenham.getCoordinates(x0, y0, x1, y1);
  }
}
