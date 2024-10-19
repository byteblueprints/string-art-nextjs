"use client";

import React, { } from "react";
import ImageSelector from "./ImageSelector";
import ImageVisualizer from "./ImageVisualizer";

interface Props {
  setImgXPos: React.Dispatch<React.SetStateAction<number>>
  setImgYPos: React.Dispatch<React.SetStateAction<number>>
  setImgScale: React.Dispatch<React.SetStateAction<number>>
  setSelectedImage: React.Dispatch<React.SetStateAction<HTMLImageElement | null>>
  setNumOfNails: React.Dispatch<React.SetStateAction<number>>
  setStringWeight: React.Dispatch<React.SetStateAction<number>>
  setMaxLineCount: React.Dispatch<React.SetStateAction<number>>
  threddingInProgress: boolean
  selectedImage: HTMLImageElement | null
  numOfNails: number
  stringWeight: number
  maxLineCount: number
}

const ImagePreProcessor: React.FC<Props> = (props: Props) => {
  const {
    setImgXPos,
    setImgYPos,
    setImgScale,
    selectedImage,
    setSelectedImage,
    setNumOfNails,
    setStringWeight,
    setMaxLineCount,
    threddingInProgress,
    numOfNails,
    stringWeight,
    maxLineCount
  } = props
  return (
    <div className="flex flex-col h-full">
      <div className="relative h-4/5">
        <ImageVisualizer
          selectedImage={selectedImage}
          setImgXPos={setImgXPos}
          setImgYPos={setImgYPos}
          setImgScale={setImgScale}
          setNumOfNails={setNumOfNails}
          setStringWeight={setStringWeight}
          setMaxLineCount={setMaxLineCount}
          numOfNails={numOfNails}
          maxLineCount={maxLineCount}
          stringWeight={stringWeight}
          threddingInProgress={threddingInProgress}
        />
      </div>
      <ImageSelector
        setSelectedImage={setSelectedImage}
        threddingInProgress={threddingInProgress}
      ></ImageSelector>
    </div>
  );
};

export default ImagePreProcessor;

