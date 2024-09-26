"use client";

import React, { Dispatch, SetStateAction } from 'react';
import ThreadingCanvas from './ThreadingCanvas';

interface Props {
  imgXPos: number
  imgYPos: number
  imgScale: number
  selectedImage: HTMLImageElement | null
  setNailSequence: React.Dispatch<React.SetStateAction<number[]>>
  setFinalStringArt: Dispatch<SetStateAction<ImageData | null>>
  numOfNails: number
  stringWeight: number
  maxLineCount: number
}


const ViewingThreads: React.FC<Props> = (props: Props) => {
  const {
    imgXPos,
    imgYPos,
    imgScale,
    selectedImage,
    setNailSequence,
    setFinalStringArt, 
    numOfNails, 
    stringWeight, 
    maxLineCount
  } = props
  return (
    <div className="container mt-5">
      <div className="flex flex-col w-full items-center justify-center">
        <ThreadingCanvas 
        imgXPos={imgXPos} 
        imgYPos={imgYPos} 
        imgScale={imgScale} 
        image={selectedImage} 
        setNailSequence={setNailSequence} 
        setFinalStringArt={setFinalStringArt}        
        numOfNails={numOfNails} 
        maxLineCount={maxLineCount} 
        stringWeight={stringWeight} 
        />
      </div>
    </div>
  );
};

export default ViewingThreads;
