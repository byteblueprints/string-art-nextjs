export class NailsCoordinatesCalculator {
  private centerX: number;
  private centerY: number;
  private radius: number;

  constructor(centerX: number, centerY: number, radius: number) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    console.log(`centerX: ${this.centerX}, centerY: ${this.centerY}, radius: ${this.radius}`);
  }

  public getNailsCoordinates(inputNumOfNails: number): [number, number][] {
    const nailsCoordinates: [number, number][] = [];

    for (let i = 0; i < inputNumOfNails; i++) {
      const theta = -Math.PI / 2 + (2 * Math.PI * i) / inputNumOfNails;
      const x = this.centerX + Math.floor(this.radius * Math.cos(theta));
      const y = this.centerY + Math.floor(this.radius * Math.sin(theta));
      nailsCoordinates.push([x, y]);
    }

    return nailsCoordinates;
  }
}
