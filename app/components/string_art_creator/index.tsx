"use client";

import React, { Dispatch, SetStateAction } from 'react';
import Canvas from './Canvas';

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
  setStringArtInProgress: React.Dispatch<React.SetStateAction<boolean>>
  stringArtInProgress: boolean
}


const StringArtCreator: React.FC<Props> = (props: Props) => {
  const {
    imgXPos,
    imgYPos,
    imgScale,
    selectedImage,
    setNailSequence,
    setFinalStringArt,
    numOfNails,
    stringWeight,
    maxLineCount,
    setStringArtInProgress,
    stringArtInProgress
  } = props
  return (
    <Canvas
      imgXPos={imgXPos}
      imgYPos={imgYPos}
      imgScale={imgScale}
      image={selectedImage}
      setNailSequence={setNailSequence}
      setFinalStringArt={setFinalStringArt}
      numOfNails={numOfNails}
      maxLineCount={maxLineCount}
      stringWeight={stringWeight}
      setStringArtInProgress={setStringArtInProgress}
      stringArtInProgress={stringArtInProgress}
    />
  );
};

export default StringArtCreator;
