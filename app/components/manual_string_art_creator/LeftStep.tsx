"use client";

import { NailsCoordinatesCalculator } from '@/app/algorithm/NailsCoordinatesCalculator';
import { ControlType } from '@/app/types/enum/ControlType';
import Pica from 'pica';
import React, { useEffect, useRef, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface Props {
  nailSequence: number[];
  setConstructedFinal: React.Dispatch<React.SetStateAction<ImageData | null>>;
  target: ImageData | null;
  setTarget: React.Dispatch<React.SetStateAction<ImageData | null>>;
  nailsCordinates: [number, number][]
  isManualThreading: boolean
  index: number
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const pica = Pica();

const LeftStep: React.FC<Props> = (props: Props) => {
  const { nailSequence, target, setTarget, setConstructedFinal, nailsCordinates, isManualThreading, index, setIndex } = props;

  const left = () => {
    if (isManualThreading && target) {
      const startPoint = {
        x: nailsCordinates[nailSequence[index - 1]][0],
        y: nailsCordinates[nailSequence[index - 1]][1],
      };
      const endPoint = {
        x: nailsCordinates[nailSequence[index]][0],
        y: nailsCordinates[nailSequence[index]][1],
      };
      let targetWithLine = drawLineUsingBreshenHamLineDrawingAlgo(target, startPoint, endPoint, { r: 255, g: 255, b: 255 });
      if (index > 1) {
        const previousStartPoint = {
          x: nailsCordinates[nailSequence[index - 1]][0],
          y: nailsCordinates[nailSequence[index - 1]][1],
        };
        const previousEndPoint = {
          x: nailsCordinates[nailSequence[index-2]][0],
          y: nailsCordinates[nailSequence[index-2]][1],
        };
        targetWithLine = drawLineUsingBreshenHamLineDrawingAlgo(target, previousStartPoint, previousEndPoint, { r: 255, g: 0, b: 0 });
      }
      setTarget(targetWithLine)
      setConstructedFinal(targetWithLine)
      setIndex(index - 1);
    }
  };
  const drawLineUsingBreshenHamLineDrawingAlgo = (imageData: ImageData, startPoint: { x: number; y: number }, endPoint: { x: number; y: number }, color: { r: number, g: number, b: number }): ImageData => {
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
  return (
    <button
      className={`bg-blue-500 text-white px-4 py-2 rounded-full ${isManualThreading ? '' : 'opacity-50 cursor-not-allowed'}`}
      onClick={() => left()}
      disabled={!isManualThreading}
    >
      <FaAngleLeft />
    </button>
  );
};

export default LeftStep;
