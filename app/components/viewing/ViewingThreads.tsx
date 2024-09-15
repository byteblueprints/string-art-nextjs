"use client";

import React, { Dispatch, SetStateAction } from 'react';
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
  setFinalImage: Dispatch<SetStateAction<ImageData | null>>
}


const ViewingThreads: React.FC<Props> = (props: Props) => {
  const { imgXPos, imgYPos, imgScale, image, setNailSequence, startManualThreading, controlType, nailSequenseIndex, setFinalImage } = props
  return (
    <div className="container mt-5">
      <div className="flex flex-col w-full items-center justify-center">
        <ThreadingCanvas imgXPos={imgXPos} imgYPos={imgYPos} imgScale={imgScale} image={image} setNailSequence={setNailSequence} startManualThreading={startManualThreading} controlType={controlType} nailSequenseIndex={nailSequenseIndex} setFinalImage={setFinalImage}/>
      </div>
      <div className="">
      </div>
    </div>
  );
};

export default ViewingThreads;
