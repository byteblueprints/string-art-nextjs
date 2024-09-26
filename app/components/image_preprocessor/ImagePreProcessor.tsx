"use client";

import React, {  } from "react";
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
    numOfNails, 
    stringWeight, 
    maxLineCount
  } = props
  return (
    <div className="container m-5">
      <div className="flex flex-col">
        <div className="content-center rounded-2xl">
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
          />
        </div>
        <ImageSelector setSelectedImage={setSelectedImage}></ImageSelector>
      </div>
    </div>
  );
};

export default ImagePreProcessor;

