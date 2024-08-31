import { BresenhamLine } from "./BresenhamLine";

export class LineConnections {
  private skip: number;

  constructor(skip: number = 20) {
    this.skip = skip;
  }

  public getAllPossibleLinesCoordinatesAgainstConnection(nc: Array<[number, number]>): { [key: string]: Array<[number, number]> } {
    const doneNails: Set<string> = new Set();
    const finalMatrix: { [key: string]: Array<[number, number]> } = {};
    let counter = 0;
    const numOfNails = nc.length;

    for (let i = 0; i < numOfNails; i++) {
      for (let j = i + this.skip; j < numOfNails; j++) {
        const connection = `${i}_${j}`;
        if (doneNails.has(connection) || i === j) {
          continue;
        }

        const lineVector = this.getLineCoordinatesAsVector(nc[i][0], nc[i][1], nc[j][0], nc[j][1]);

        doneNails.add(`${i}_${j}`);
        doneNails.add(`${j}_${i}`);

        finalMatrix[`${i}_${j}`] = lineVector;
        finalMatrix[`${j}_${i}`] = lineVector;

        counter++;
      }
    }

    return finalMatrix;
  }

  private getLineCoordinatesAsVector(x0: number, y0: number, x1: number, y1: number): Array<[number, number]> {
    const bresenham = new BresenhamLine();
    return bresenham.getCoordinates(x0, y0, x1, y1);
  }
}
