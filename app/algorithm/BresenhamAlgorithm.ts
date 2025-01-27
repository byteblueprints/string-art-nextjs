export class BresenhamAlgorithm {
  public getCoordinates(x0: number, y0: number, x1: number, y1: number): Array<[number, number]> {
    const lineCoordinates: Array<[number, number]> = [];

    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;

    while (true) {
      lineCoordinates.push([x0, y0]);

      if (x0 === x1 && y0 === y1) {
        break;
      }

      const e2 = err * 2;

      if (e2 > -dy) {
        err -= dy;
        x0 += sx;
      }

      if (e2 < dx) {
        err += dx;
        y0 += sy;
      }
    }

    return lineCoordinates;
  }
}

export function drawBreshenHamLineWithStringWeight(
  imageData: ImageData,
  startPoint: { x: number; y: number },
  endPoint: { x: number; y: number },
  stringWeight: number
): ImageData {
  const { width, height, data } = imageData;

  const dx = Math.abs(endPoint.x - startPoint.x);
  const dy = Math.abs(endPoint.y - startPoint.y);
  const sx = startPoint.x < endPoint.x ? 1 : -1;
  const sy = startPoint.y < endPoint.y ? 1 : -1;
  let err = dx - dy;

  let x = startPoint.x;
  let y = startPoint.y;

  while (true) {
    if (x >= 0 && x < width && y >= 0 && y < height) {
      const index = (y * width + x) * 4;
      data[index] = stringWeight;
      data[index + 1] = stringWeight;
      data[index + 2] = stringWeight;
      data[index + 3] = 255;
    }

    if (x === endPoint.x && y === endPoint.y) break;

    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x += sx;
    }
    if (e2 < dx) {
      err += dx;
      y += sy;
    }
  }

  return imageData;
}

export const drawBreshenHamLineWithColor = (imageData: ImageData, startPoint: { x: number; y: number }, endPoint: { x: number; y: number }, color: { r: number, g: number, b: number }): ImageData => {
  const { width, height, data } = imageData;

  const dx = Math.abs(endPoint.x - startPoint.x);
  const dy = Math.abs(endPoint.y - startPoint.y);
  const sx = startPoint.x < endPoint.x ? 1 : -1;
  const sy = startPoint.y < endPoint.y ? 1 : -1;
  let err = dx - dy;

  let x = startPoint.x;
  let y = startPoint.y;

  while (true) {
    if (x >= 0 && x < width && y >= 0 && y < height) {
      const index = (y * width + x) * 4;
      data[index] = color.r;
      data[index + 1] = color.g;
      data[index + 2] = color.b;
      data[index + 3] = 255;
    }

    if (x === endPoint.x && y === endPoint.y) break;

    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x += sx;
    }
    if (e2 < dx) {
      err += dx;
      y += sy;
    }
  }

  return imageData;
}