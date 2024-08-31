"use client";

import React, { useState } from 'react';
import LoadImage from './components/preperation/LoadImage';
import ViewingThreads from './components/viewing/ViewingThreads';
import ManualViewing from './components/manual_view/ManualViewing';
import styles from './styles/Home.module.css';

const Home: React.FC = () => {
  const [imgXPos, setImgXPos] = useState(0)
  const [imgYPos, setImgYPos] = useState(0)
  const [imgScale, setImgScale] = useState(1)
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <LoadImage setImgXPos={setImgXPos} setImgYPos={setImgYPos} setImgScale={setImgScale} setImage={setImage} />
      </div>
      <div className={styles.box}>
        <ViewingThreads imgXPos={imgXPos} imgYPos={imgYPos} imgScale={imgScale} image={image} />
      </div>
      <div className={styles.box}>
        <ManualViewing />
      </div>
    </div>
  );
};

export default Home;
