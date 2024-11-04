"use client";

import { NailsCoordinatesCalculator } from '@/app/algorithm/NailsCoordinatesCalculator';
import { MANUAL_DRAW_PADDING } from '@/app/utils/constants';
import Pica from 'pica';
import React, { useEffect, useRef } from 'react';

interface Props {
  finalImage: ImageData | null
  index: number
  nailCount: number
}
const pica = Pica();

const Canvas: React.FC<Props> = (props: Props) => {
  const { finalImage, index, nailCount } = props;
  const canvasReference = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasReference.current && finalImage) {
      const canvas = canvasReference.current;
      const calculator = new NailsCoordinatesCalculator((canvas.clientWidth / 2), (canvas.clientHeight / 2), (canvas.clientWidth / 2) - MANUAL_DRAW_PADDING);
      const nailsCoordinates = calculator.getNailsCoordinates(nailCount);
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      const outputContext = canvas.getContext("2d")

      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = finalImage.width;
      tempCanvas.height = finalImage.height;
      const ctx = tempCanvas.getContext("2d");

      if (ctx != null) {
        ctx.putImageData(finalImage, 0, 0);
        const outputCanvas = document.createElement('canvas');
        outputCanvas.width = canvas.clientWidth;
        outputCanvas.height = canvas.clientHeight;
        pica.resize(tempCanvas, outputCanvas, {
          quality: 3
        }).then((result) => {
          if (outputContext != null) {
            outputContext.globalCompositeOperation = 'source-over';
            outputContext.drawImage(
              outputCanvas,
              MANUAL_DRAW_PADDING,
              MANUAL_DRAW_PADDING,
              canvas.width - MANUAL_DRAW_PADDING * 2,
              canvas.height - MANUAL_DRAW_PADDING * 2
            );
            drawNails(nailsCoordinates, outputContext)
          }
        }).catch((error) => {
          console.error("Error during resizing with Pica: ", error);
        }).finally(() => {
          outputCanvas.remove();
        });;
      }
    } else {
      // clearCanvas(maxHeight)
    }
  }, [index, finalImage])
  const clearCanvas = async (maxHeight: number) => {
    if (canvasReference.current) {
      const canvas = canvasReference.current;
      canvas.width = maxHeight;
      canvas.width = maxHeight;
      const outputContext = canvas.getContext("2d")
      if (outputContext != null) {
        outputContext.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }
  function drawNails(nailsCordinates: [number, number][], ctx: CanvasRenderingContext2D) {
    let count = 0;
    let i = 1;
    nailsCordinates.forEach(([xx, yy]) => {
      for (let x = xx - 1; x < xx + 2; x++) {
        for (let y = yy - 1; y < yy + 2; y++) {
          if (ctx) {
            const pixelData = ctx.createImageData(1, 1);
            pixelData.data[0] = 255;
            pixelData.data[1] = 0;
            pixelData.data[2] = 0;
            pixelData.data[3] = 255;
            ctx.putImageData(pixelData, x, y);
          }
        }
      };
      if (count % 5 == 0) {
        ctx.font = "10px Arial";
        ctx.fillText("" + i, xx, yy);
      }
      count++;
      i++;
    });
  }
  return (
    <div className="flex flex-col justify-center items-center w-full pt-24 lg:pt-0 p-5">
      <canvas ref={canvasReference} className="w-full aspect-square bg-white border-2 border-gray-300 rounded-2xl" />
    </div>
  );
};

export default Canvas;
