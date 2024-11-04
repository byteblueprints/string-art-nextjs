"use client";

import { NailsCoordinatesCalculator } from '@/app/algorithm/NailsCoordinatesCalculator';
import { createTempCanvas, drawNailsWithNumbers, resizeImage, setCanvasDimensions } from '@/app/utils/canvas_operations';
import { MANUAL_DRAW_PADDING, OUTPUT_SCALING_FACTOR } from '@/app/utils/constants';
import Pica from 'pica';
import React, { RefObject, useEffect, useRef } from 'react';

interface Props {
  finalImage: ImageData | null
  index: number
  nailCount: number
  canvasReference: RefObject<HTMLCanvasElement>
}
const pica = Pica();

const Canvas: React.FC<Props> = (props: Props) => {
  const { finalImage, index, nailCount, canvasReference } = props;

  useEffect(() => {
    if (canvasReference && canvasReference.current && finalImage) {
      const canvas = canvasReference.current;
      const calculator = new NailsCoordinatesCalculator((canvas.clientWidth / 2), (canvas.clientHeight / 2), (canvas.clientWidth / 2) - MANUAL_DRAW_PADDING);
      const nailsCoordinates = calculator.getNailsCoordinates(nailCount);
      setCanvasDimensions(canvas);
      const tempCanvas = createTempCanvas(finalImage);
      resizeImage(tempCanvas, canvas)
        .then(() => drawNailsWithNumbers(nailsCoordinates, canvas))
        .catch((error) => {
          console.error("Error during resizing with Pica: ", error);
        });
    }
  }, [index, finalImage]);
  return (
    <div className="flex flex-col justify-center items-center w-full pt-24 lg:pt-0 p-5">
      <canvas ref={canvasReference} className="w-full aspect-square bg-white border-2 border-gray-300 rounded-2xl" />
    </div>
  );
};

export default Canvas;
