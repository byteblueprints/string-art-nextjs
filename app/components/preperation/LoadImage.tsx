"use client";
import React, { useEffect, useState } from "react";
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
    <div className="container m-5">
      <div className="flex flex-col">
        <div className="content-center rounded-2xl">
          <ImageCanvas setImgXPos={setImgXPos} setImgYPos={setImgYPos} setImgScale={setImgScale} selectedImage={selectedImage}></ImageCanvas>
        </div>
        <MyFileUploader setSelectedImage={setSelectedImage} setImage={setImage}></MyFileUploader>
      </div>
    </div>
  );
};

export default LoadImage;

