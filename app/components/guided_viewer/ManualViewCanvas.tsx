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
  let maxHeight = 700
  const calculator = new NailsCoordinatesCalculator((maxHeight / 2) + 25, (maxHeight / 2) + 25, maxHeight / 2);
  const nailsCoordinates = calculator.getNailsCoordinates(nailCount);

  useEffect(() => {
    if (canvasReference.current && finalImage) {
      const canvas = canvasReference.current;
      // maxHeight = canvas.width
      canvas.width = maxHeight + 50;
      canvas.height = maxHeight + 50;
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
      clearCanvas(maxHeight)
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
      for (let x = xx; x < xx + 4; x++) {
        for (let y = yy; y < yy + 4; y++) {
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
    <div className="flex-grow flex justify-center items-center mb-4">
      <div className="justify-center items-center bg-white">
        <canvas ref={canvasReference} className="bg-white" />
      </div>
    </div>
  );
};

export default ManualViewingCanvas;
