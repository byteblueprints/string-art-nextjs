"use client";

import { NailsCoordinatesCalculator } from '@/app/algorithm/NailsCoordinatesCalculator';
import { ControlType } from '@/app/types/enum/ControlType';
import Pica from 'pica';
import React, { useEffect, useRef, useState } from 'react';
import Canvas from './Canvas';
import LeftStep from './LeftStep';
import RightStep from './RightStep';
import DrawFinalImage from './DrawFInalImage';

interface Props {
  nailSequence: number[];
  finalStringArt: ImageData | null
  stringArtInProgress: boolean
  nailCount: number
}

const pica = Pica();

const ManualStringArtCreator: React.FC<Props> = (props: Props) => {
  const { nailSequence, finalStringArt, stringArtInProgress, nailCount } = props;
  const [index, setIndex] = useState(0);
  const [target, setTarget] = useState<ImageData | null>(null);
  const [nailsCordinates, setNailsCordinates] = useState<[number, number][]>([]);
  const [constructedFinal, setConstructedFinal] = useState<ImageData | null>(null);
  const [isManualThreading, setIsManualThreading] = useState(false);

  useEffect(() => {
    setTarget(createImageData(700 * 7, 700 * 7, 255));
    const calculator = new NailsCoordinatesCalculator(700 * 7 / 2, 700 * 7 / 2, (700 * 7 / 2) - 1);
    setNailsCordinates(calculator.getNailsCoordinates(nailCount));
  }, [nailCount])
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
  const start = async () => {
    setIsManualThreading(true)
  };

  return (
    <>
      <div className="h-full lg:h-[80%] lg:basis-1/2 mt-10 p-5">
        <Canvas finalImage={constructedFinal} index={index} nailCount={nailCount} />
      </div>

      <div className="h-full lg:h-[80%] lg:basis-1/2 mt-10 p-5 flex flex-col justify-center items-center">
        <div className="text-xs font-medium md:text-sm md:font-medium whitespace-nowrap overflow-hidden text-ellipsis text-black p-3">
          Current Index: {index}
        </div>
        <div className="text-xs font-medium md:text-sm md:font-medium whitespace-nowrap overflow-hidden text-ellipsis text-black p-3">
          Starting Nail: {nailSequence[index - 1] + 1} -{'>'} End Nail: {nailSequence[index] + 1}
        </div>

        <button
          disabled={stringArtInProgress}
          className="bg-blue-500 text-white px-4 py-2 rounded-full"
          onClick={() => start()}
        >
          Start Manual Threading
        </button>
        <div className="flex p-4 space-x-4 justify-center items-center bg-white">
          <LeftStep
            nailSequence={nailSequence}
            setConstructedFinal={setConstructedFinal}
            target={target}
            setTarget={setTarget}
            nailsCordinates={nailsCordinates}
            isManualThreading={isManualThreading}
            index={index}
            setIndex={setIndex}
          />
          <RightStep
            nailSequence={nailSequence}
            setConstructedFinal={setConstructedFinal}
            target={target} setTarget={setTarget}
            nailsCordinates={nailsCordinates}
            isManualThreading={isManualThreading}
            index={index}
            setIndex={setIndex}
          />
          <DrawFinalImage
            setConstructedFinal={setConstructedFinal}
            finalStringArt={finalStringArt}
            target={target}
            stringArtInProgress={stringArtInProgress}
          />
        </div>
      </div>
    </>
  );
};

export default ManualStringArtCreator;
