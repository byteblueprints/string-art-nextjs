"use client";

import React, { useState } from 'react';
import LoadImage from './components/preperation/LoadImage';
import ViewingThreads from './components/viewing/ViewingThreads';
import ManualViewing from './components/manual_view/ManualViewing';
import { ControlType } from './types/enum/ControlType';

const Home: React.FC = () => {
  const [imgXPos, setImgXPos] = useState(0)
  const [imgYPos, setImgYPos] = useState(0)
  const [imgScale, setImgScale] = useState(1)
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [nailSequence, setNailSequence] = useState<number[]>([]);
  const [startManualThreading, setStartManualThreading] = useState<boolean>(false);
  const [controlType, setControlType] = useState<ControlType>(ControlType.UP);
  const [nailSequenseIndex, setNailSequenseIndex] = useState<number>(0);  
  const [finalImage, setFinalImage] = useState<ImageData | null>(null)

  return (
    <div className='container'>
      <div className=' flex flex-row'>
        <div className='basis-1/2'>
          <LoadImage setImgXPos={setImgXPos} setImgYPos={setImgYPos} setImgScale={setImgScale} setImage={setImage} />
        </div>
        <div className='basis-1/2'>
          <ViewingThreads imgXPos={imgXPos} imgYPos={imgYPos} imgScale={imgScale} image={image} setNailSequence={setNailSequence} startManualThreading={startManualThreading} controlType={controlType} nailSequenseIndex={nailSequenseIndex} setFinalImage={setFinalImage}/>
        </div>
      </div>
      <div className='flex flex-row'>
        <div className='basis-full'>
          <ManualViewing nailSequence={nailSequence} setStartManualThreading={setStartManualThreading} setControlType={setControlType} setNailSequenseIndex={setNailSequenseIndex} finalImage={finalImage}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
