"use client";
import React from "react";
import MyFileUploader from "./MyFileUploader";
import ImageCanvas from "./ImageCanvas";

interface Props {
  setImgXPos: React.Dispatch<React.SetStateAction<number>>
  setImgYPos: React.Dispatch<React.SetStateAction<number>>
  setImgScale: React.Dispatch<React.SetStateAction<number>>
  setImage: React.Dispatch<React.SetStateAction<HTMLImageElement | null>>
}

const LoadImage: React.FC<Props> = (props: Props) => {
  const { setImgXPos, setImgYPos, setImgScale, setImage } = props
  return (
    <div className="load-image">
      <MyFileUploader></MyFileUploader>
      <div className="canvas-container">
        <ImageCanvas setImgXPos={setImgXPos} setImgYPos={setImgYPos} setImgScale={setImgScale} setImage={setImage}></ImageCanvas>
      </div>
      <div className="controls">
        {/* Controls for uploading and adjusting image */}
      </div>
    </div>
  );
};

export default LoadImage;
