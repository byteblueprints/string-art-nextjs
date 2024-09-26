"use client";

import React, { useState } from 'react';
import ImagePreProcessor from './components/image_preprocessor/ImagePreProcessor';
import ViewingThreads from './components/string_art_visualizer/ViewingThreads';
import ManualViewing from './components/guided_viewer/ManualViewing';

const Home: React.FC = () => {
  const [imgXPos, setImgXPos] = useState(0)
  const [imgYPos, setImgYPos] = useState(0)
  const [imgScale, setImgScale] = useState(1)
  const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(null);
  const [nailSequence, setNailSequence] = useState<number[]>([]);
  const [finalStringArt, setFinalStringArt] = useState<ImageData | null>(null)

  const [numOfNails, setNumOfNails] = useState(250);
  const [stringWeight, setStringWeight] = useState(20);
  const [maxLineCount, setMaxLineCount] = useState(4000);

  return (
    <div className='container'>
      <div className='flex flex-col lg:flex-row content-center'>
        <div className='basis-full lg:basis-1/2'>
          <ImagePreProcessor
            setImgXPos={setImgXPos}
            setImgYPos={setImgYPos}
            setImgScale={setImgScale}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}            
            numOfNails={numOfNails}
            maxLineCount={maxLineCount}
            stringWeight={stringWeight}
            setNumOfNails={setNumOfNails}
            setStringWeight={setStringWeight}
            setMaxLineCount={setMaxLineCount}
          />
        </div>
        <div className='basis-full lg:basis-1/2'>
          <ViewingThreads
            imgXPos={imgXPos}
            imgYPos={imgYPos}
            imgScale={imgScale}
            selectedImage={selectedImage}
            setNailSequence={setNailSequence}
            setFinalStringArt={setFinalStringArt}
            numOfNails={numOfNails}
            maxLineCount={maxLineCount}
            stringWeight={stringWeight}
          />
        </div>
      </div>

      <div className="flex flex-col h-screen m-4 content-center">
        <div className="basis-full">
          <ManualViewing
            nailSequence={nailSequence}
            finalStringArt={finalStringArt}
          />
        </div>
      </div>
    </div>

  );
};

export default Home;
