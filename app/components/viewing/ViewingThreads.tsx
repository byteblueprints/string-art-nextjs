"use client";

import React from 'react';
import ThreadingCanvas from './ThreadingCanvas';

interface Props {
  imgXPos: number
  imgYPos: number
  imgScale: number
  image: HTMLImageElement | null
}


const ViewingThreads: React.FC<Props> = (props: Props) => {
  const { imgXPos, imgYPos, imgScale, image } = props
  return (
    <div className="viewing-threads">
      <h2 style={{ color: "black" }}></h2>
      <div className="image-thread">
        <ThreadingCanvas imgXPos={imgXPos} imgYPos={imgYPos} imgScale={imgScale} image={image} />
      </div>
      <div className="progress-bar">
      </div>
    </div>
  );
};

export default ViewingThreads;
