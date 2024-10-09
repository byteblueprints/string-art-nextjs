import { CurrentStatus } from "../types/enum/CurrentStatus";
import { BresenhamLine } from "./BresenhamLine";
import { Storage } from "./Storage";

export class LineConnections {
  private skip: number;

  constructor(skip: number = 20) {
    this.skip = skip;
  }

  // public async getAllPossibleLinesCoordinatesAgainstConnection(nc: Array<[number, number]>, callback: (progress: any) => void){
  //   const doneNails: Set<string> = new Set();
  //   let counter = 0;
  //   const numOfNails = nc.length;
  //   let lineCoordinates: { [key: string]: Array<[number, number]> } = {};

  //   for (let i = 0; i < numOfNails; i++) {
  //     for (let j = i + this.skip; j < numOfNails; j++) {
  //       const connection = `${i}_${j}`;
  //       if (doneNails.has(connection) || i === j) {
  //         continue;
  //       }

  //       const lineVector = this.getLineCoordinatesAsVector(nc[i][0], nc[i][1], nc[j][0], nc[j][1]);

  //       doneNails.add(`${i}_${j}`);
  //       doneNails.add(`${j}_${i}`);

  //       lineCoordinates[`${i}_${j}`] = lineVector;
  //       lineCoordinates[`${j}_${i}`] = lineVector;

  //       counter++;
  //       console.log(counter)  
  //     }
  //     callback({lineCoordinates: lineCoordinates, key: `${i}`, status: CurrentStatus.INPROGRESS})     
  //     lineCoordinates = {} 
  //   }
  //   callback({status: CurrentStatus.COMPLETED})  
  // }
  public async getAllPossibleLinesCoordinatesAgainstConnection(nc: Array<[number, number]>, callback: (progress: any) => void) {
    const lineStorage = new Storage("lines")
    const doneNails: Set<string> = new Set();
    let counter = 0;
    const numOfNails = nc.length;
    let lineCoordinates: { [key: string]: Array<[number, number]> } | null = {};

    for (let i = 0; i < numOfNails; i++) {
      lineCoordinates = {}
      let count = 0;
      for (let j = this.skip; count < numOfNails - this.skip; j++) {
        const endNail = (i + j) % numOfNails;

        const lineVector = this.getLineCoordinatesAsVector(nc[i][0], nc[i][1], nc[endNail][0], nc[endNail][1]);

        lineCoordinates[`${i}_${endNail}`] = lineVector;
        lineCoordinates[`${endNail}_${i}`] = lineVector;

        counter++;
        count++;
        // if (counter % 10 == 0) {
        //   callback({ calculateLineCount: counter, status: CurrentStatus.INPROGRESS })
        // }
      }
      console.log(counter)
      await lineStorage.store(`${i}`, lineCoordinates);
      callback({ lineCoordinates: lineCoordinates, key: `${i}`, status: CurrentStatus.INPROGRESS, calculateLineCount: counter })
      lineCoordinates = null
    }
    // callback({ status: CurrentStatus.COMPLETED })
  }

  private getLineCoordinatesAsVector(x0: number, y0: number, x1: number, y1: number): Array<[number, number]> {
    const bresenham = new BresenhamLine();
    return bresenham.getCoordinates(x0, y0, x1, y1);
  }
}
