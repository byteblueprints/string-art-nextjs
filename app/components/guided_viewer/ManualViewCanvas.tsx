"use client";

import Pica from 'pica';
import React, { useEffect, useRef } from 'react';

interface Props {
  finalImage: ImageData | null
  index: number
}
const pica = Pica();


function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const ManualViewingCanvas: React.FC<Props> = (props: Props) => {
  const { finalImage, index } = props;
  const canvasReference = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let maxHeight = 700
    if (canvasReference.current && finalImage) {
      const canvas = canvasReference.current;
      maxHeight = canvas.width
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
            outputContext.drawImage(outputCanvas, 0, 0, maxHeight, maxHeight);
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

  return (
    <div className="flex-grow flex justify-center items-center mb-4">
      <div className="justify-center items-center bg-white">
        <canvas ref={canvasReference} className="bg-white" />
      </div>
    </div>
  );
};

export default ManualViewingCanvas;
