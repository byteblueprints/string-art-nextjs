"use client";

import { NailsCoordinatesCalculator } from '@/app/algorithm/NailsCoordinatesCalculator';
import Pica from 'pica';
import React, { useEffect, useRef } from 'react';

interface Props {
  finalImage: ImageData | null
  index: number
  nailCount: number
}
const pica = Pica();

const ManualViewingCanvas: React.FC<Props> = (props: Props) => {
  const { finalImage, index, nailCount } = props;
  const canvasReference = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasReference.current && finalImage) {
      const canvas = canvasReference.current;      
      const maxHeight = canvas.clientWidth
      const calculator = new NailsCoordinatesCalculator((maxHeight / 2) + 25, (maxHeight / 2) + 25, maxHeight / 2);
      const nailsCoordinates = calculator.getNailsCoordinates(nailCount);
      canvas.width = maxHeight;
      canvas.height = maxHeight;
      const outputContext = canvas.getContext("2d")
      const createdCanvas = document.createElement('canvas');
      createdCanvas.width = finalImage.width;
      createdCanvas.height = finalImage.height;
      const ctx = createdCanvas.getContext("2d");

      if (ctx != null) {
        ctx.putImageData(finalImage, 0, 0);

        const outputCanvas = document.createElement('canvas');
        outputCanvas.width = maxHeight;
        outputCanvas.height = maxHeight;
        pica.resize(createdCanvas, outputCanvas, {
          quality: 3
        }).then((result) => {
          if (outputContext != null) {
            outputContext.globalCompositeOperation = 'source-over';
            outputContext.drawImage(outputCanvas, 25, 25, maxHeight, maxHeight);
            drawNails(nailsCoordinates, outputContext)
          }
        }).catch((error) => {
          console.error("Error during resizing with Pica: ", error);
        }).finally(() => {
          createdCanvas.remove();
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
      <div className="flex flex-col justify-center items-center w-full pt-24 lg:pt-0">
        <canvas ref={canvasReference} className="w-[80%] aspect-square bg-white border-2 border-gray-300 rounded-2xl" />
      </div>
  );
};

export default ManualViewingCanvas;
