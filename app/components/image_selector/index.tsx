"use client";

import React, { } from "react";
import FileChooser from "./FileChooser";
import Preview from "./Preview";

interface Props {
  setImgXPos: React.Dispatch<React.SetStateAction<number>>
  setImgYPos: React.Dispatch<React.SetStateAction<number>>
  setImgScale: React.Dispatch<React.SetStateAction<number>>
  setSelectedImage: React.Dispatch<React.SetStateAction<HTMLImageElement | null>>
  setNumOfNails: React.Dispatch<React.SetStateAction<number>>
  setStringWeight: React.Dispatch<React.SetStateAction<number>>
  setMaxLineCount: React.Dispatch<React.SetStateAction<number>>
  stringArtInProgress: boolean
  selectedImage: HTMLImageElement | null
  numOfNails: number
  stringWeight: number
  maxLineCount: number
}

const ImageSelector: React.FC<Props> = (props: Props) => {
  const {
    setImgXPos,
    setImgYPos,
    setImgScale,
    selectedImage,
    setSelectedImage,
    setNumOfNails,
    setStringWeight,
    setMaxLineCount,
    stringArtInProgress,
    numOfNails,
    stringWeight,
    maxLineCount
  } = props
  return (
    <div className="flex flex-col h-full relative">
      <div className="relative h-full">
        <Preview
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
          stringArtInProgress={stringArtInProgress}
        />
      </div>

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[120%]">
        <FileChooser
          setSelectedImage={setSelectedImage}
          stringArtInProgress={stringArtInProgress}
        ></FileChooser>
      </div>
    </div>
  );
};

export default ImageSelector;

