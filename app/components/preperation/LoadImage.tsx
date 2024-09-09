"use client";
import React, { useState } from "react";
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
  const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(null);
  return (
    <div className="rounded-2xl m-5 content-center">
      <div className="flex flex-col w-full content-center">
        <div className="content-center rounded-2xl">
          <ImageCanvas setImgXPos={setImgXPos} setImgYPos={setImgYPos} setImgScale={setImgScale} setImage={setImage} selectedImage={selectedImage}></ImageCanvas>
        </div>
        <MyFileUploader setSelectedImage={setSelectedImage}></MyFileUploader>
      </div>
    </div>
  );
};

export default LoadImage;

