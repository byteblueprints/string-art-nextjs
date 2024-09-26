"use client";

import { NailsCoordinatesCalculator } from '@/app/algorithm/NailsCoordinatesCalculator';
import { ControlType } from '@/app/types/enum/ControlType';
import Pica from 'pica';
import React, { useEffect, useRef, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface Props {
}
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const pica = Pica();

const LeftStep: React.FC<Props> = (props: Props) => {
  const {  } = props;
  const [isManualThreading, setIsManualThreading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [index, setIndex] = useState(0);
  const [target, setTarget] = useState<ImageData | null>(null);
  useEffect(() => {
    setTarget(createImageData(800, 800, 255));
  }, [])
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

  const left = () => {
    console.log("left clicked")
  };

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
