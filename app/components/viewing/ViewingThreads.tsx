"use client";

import React from 'react';
import ThreadingCanvas from './ThreadingCanvas';
import { ControlType } from '@/app/types/enum/ControlType';

interface Props {
  imgXPos: number
  imgYPos: number
  imgScale: number
  image: HTMLImageElement | null
  setNailSequence: React.Dispatch<React.SetStateAction<number[]>>
  startManualThreading: boolean
  controlType: ControlType
  nailSequenseIndex: number
}


const ViewingThreads: React.FC<Props> = (props: Props) => {
  const { imgXPos, imgYPos, imgScale, image, setNailSequence, startManualThreading, controlType, nailSequenseIndex } = props
  return (
    <div className="rounded-2xl m-5 items-center">
      <div className="flex flex-col w-full items-center justify-center">
        <ThreadingCanvas imgXPos={imgXPos} imgYPos={imgYPos} imgScale={imgScale} image={image} setNailSequence={setNailSequence} startManualThreading={startManualThreading} controlType={controlType} nailSequenseIndex={nailSequenseIndex} />
      </div>
      <div className="">
      </div>
    </div>
  );
};

export default ViewingThreads;
