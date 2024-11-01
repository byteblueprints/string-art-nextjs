"use client";

import React, { useState } from 'react';
import ImageSelector from './components/image_selector';
import StringArtCreator from './components/string_art_creator';
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
  const [stringArtInProgress, setStringArtInProgress] = useState(false);

  return (
    <div className='container'>
      <div className='flex flex-col lg:flex-row h-screen'>
        <div className='h-full lg:h-[80%] lg:basis-1/2 mt-10 p-5'>
          <ImageSelector
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
            stringArtInProgress={stringArtInProgress}
          />
        </div>
        <div className='h-full lg:h-[80%] lg:basis-1/2 mt-10 p-5'>
          <StringArtCreator
            imgXPos={imgXPos}
            imgYPos={imgYPos}
            imgScale={imgScale}
            selectedImage={selectedImage}
            setNailSequence={setNailSequence}
            setFinalStringArt={setFinalStringArt}
            numOfNails={numOfNails}
            maxLineCount={maxLineCount}
            stringWeight={stringWeight}
            setStringArtInProgress={setStringArtInProgress}
            stringArtInProgress={stringArtInProgress}
          />
        </div>
      </div>

      <div className="flex flex-col h-screen m-4 content-center p-5">
        <div className="basis-full">
          <ManualViewing
            nailSequence={nailSequence}
            finalStringArt={finalStringArt}
            stringArtInProgress={stringArtInProgress}
            nailCount={numOfNails}
          />
        </div>
      </div>
    </div>
    
  );
};

export default Home;
