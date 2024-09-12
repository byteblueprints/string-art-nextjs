import { NailsCoordinatesCalculator } from '@/app/algorithm/NailsCoordinatesCalculator';
import { ControlType } from '@/app/types/enum/ControlType';
import Pica from 'pica';
import React, { useRef, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface Props {
  nailSequence: number[];
  setStartManualThreading: React.Dispatch<React.SetStateAction<boolean>>;
  setControlType: React.Dispatch<React.SetStateAction<ControlType>>;
  setNailSequenseIndex: React.Dispatch<React.SetStateAction<number>>;
  finalImage: ImageData | null
}
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const pica = Pica();

const ManualViewing: React.FC<Props> = (props: Props) => {
  const { nailSequence, setStartManualThreading, setControlType, setNailSequenseIndex, finalImage } = props;
  const [isManualThreading, setIsManualThreading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [index, setIndex] = useState(0);
  const createImageData = (width: number, height: number, fillValue: number): ImageData => {
    const imageData = new ImageData(width, height);
    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i] = fillValue;
      imageData.data[i + 1] = fillValue;
      imageData.data[i + 2] = fillValue;
      imageData.data[i + 3] = 255;
    }
    return imageData;
  }
  let target = createImageData(800, 800, 255);
  const right = async () => {
    if (isManualThreading) {
      setControlType(ControlType.RIGHT);
      setNailSequenseIndex(index + 1);
      if (canvasRef.current && finalImage) {
        const canvas = canvasRef.current;
        canvas.width = 800;
        canvas.height = 800;
        const outputContext = canvas.getContext("2d")
        if (outputContext != null) {
          clearCanvas();
          setStartManualThreading(true);
          setIsManualThreading(true);
          const calculator = new NailsCoordinatesCalculator(400, 400, 399);
          const nailsCordinates = calculator.getNailsCoordinates(288);
          const startPoint = {
            x: nailsCordinates[nailSequence[index]][0],
            y: nailsCordinates[nailSequence[index]][1],
          };
          const endPoint = {
            x: nailsCordinates[nailSequence[index+1]][0],
            y: nailsCordinates[nailSequence[index+1]][1],
          };
          target = drawLineUsingBreshenHamLineDrawingAlgo(target, startPoint, endPoint)
          outputContext.globalCompositeOperation = 'source-over';
          outputContext.putImageData(target, 0, 0)
          await sleep(100)
        }
      }
      setIndex(index + 1);
    }
  };

  const left = () => {
    if (isManualThreading) {
      setControlType(ControlType.LEFT);
      setNailSequenseIndex(index - 1);
      setIndex(index - 1);
    }
  };

  const start = async () => {
    if (canvasRef.current && finalImage) {
      const canvas = canvasRef.current;
      canvas.width = 800;
      canvas.height = 800;
      const outputContext = canvas.getContext("2d")
      if (outputContext != null) {
        clearCanvas();
        setStartManualThreading(true);
        setIsManualThreading(true);
        const calculator = new NailsCoordinatesCalculator(400, 400, 399);
        const nailsCordinates = calculator.getNailsCoordinates(288);
        drawNails(nailsCordinates, outputContext)
        const startPoint = {
          x: nailsCordinates[nailSequence[index]][0],
          y: nailsCordinates[nailSequence[index]][1],
        };
        const endPoint = {
          x: nailsCordinates[nailSequence[index+1]][0],
          y: nailsCordinates[nailSequence[index+1]][1],
        };
        target = drawLineUsingBreshenHamLineDrawingAlgo(target, startPoint, endPoint)
        outputContext.globalCompositeOperation = 'source-over';
        outputContext.putImageData(target, 0, 0)
        await sleep(100)
      }
    }
    setIndex(index + 1);
  };
  const drawLineUsingBreshenHamLineDrawingAlgo = (imageData: ImageData, startPoint: { x: number; y: number }, endPoint: { x: number; y: number }): ImageData => {
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
        data[index] = 20;     // R
        data[index + 1] = 20; // G
        data[index + 2] = 20; // B
        data[index + 3] = 255; // A
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
  const drawNails = (nailsCordinates: [number, number][], ctx: CanvasRenderingContext2D) => {
    nailsCordinates.forEach(([xx, yy]) => {
      for (let x = xx; x < xx + 2; x++) {
        for (let y = yy; y < yy + 2; y++) {
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
    });
  }
  const clearCanvas = () => {
    if (canvasRef.current && finalImage) {
      const canvas = canvasRef.current;
      canvas.width = 800;
      canvas.height = 800;
      const outputContext = canvas.getContext("2d")
      if (outputContext != null) {
        outputContext.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }
  const finalView = async () => {
    if (canvasRef.current && finalImage) {
      const canvas = canvasRef.current;
      canvas.width = 800;
      canvas.height = 800;
      const outputContext = canvas.getContext("2d")
      const createdCanvas = document.createElement('canvas');
      createdCanvas.width = finalImage.width;
      createdCanvas.height = finalImage.height;
      const ctx = createdCanvas.getContext("2d");

      if (ctx != null) {
        ctx.putImageData(finalImage, 0, 0);

        const outputCanvas = document.createElement('canvas');
        outputCanvas.width = 800;
        outputCanvas.height = 800;

        pica.resize(createdCanvas, outputCanvas, {
          quality: 3
        }).then((result) => {
          if (outputContext != null) {
            outputContext.globalCompositeOperation = 'source-over';
            outputContext.drawImage(outputCanvas, 0, 0);
          }
        }).catch((error) => {
          console.error("Error during resizing with Pica: ", error);
        }).finally(() => {
          createdCanvas.remove();
          outputCanvas.remove();
        });;
      }
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-4">
      <div className="mb-4 text-lg font-semibold text-black">
        Current Nail: {nailSequence[index] || 'None'}
      </div>
      <div className="flex-grow flex justify-center items-center bg-gray-100 border border-gray-300 mb-4">
        <div className="w-full max-w-[800px] h-[800px] bg-white border border-gray-300">
          <canvas ref={canvasRef} id="string_art" className="w-full max-w-[800px] h-[800px] bg-white border border-gray-300" />
        </div>
      </div>
      <div className="flex space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => start()}
        >
          Start Manual Threading
        </button>
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded ${isManualThreading ? '' : 'opacity-50 cursor-not-allowed'}`}
          onClick={() => left()}
          disabled={!isManualThreading}
        >
          <FaAngleLeft />
        </button>
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded ${isManualThreading ? '' : 'opacity-50 cursor-not-allowed'}`}
          onClick={() => right()}
          disabled={!isManualThreading}
        >
          <FaAngleRight />
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => finalView()}
        >
          Toggle final view
        </button>
      </div>
    </div>
  );
};

export default ManualViewing;
