"use client";

import React from 'react';
import ImageSelector from './components/image_selector';
import StringArtCreator from './components/string_art_creator';
import ManualStringArtCreator from './components/manual_string_art_creator';
import { ApplicationContextProvider } from './context_provider';
import SocialLinks from './components/SocialLinks';

const Home: React.FC = () => {
  return (
    <ApplicationContextProvider>
      <div className='container'>
        <SocialLinks />
      </div>
      <div className='container'>
        <div className='flex flex-col lg:flex-row h-screen pt-10'>
          <div className='h-full lg:h-[75%] lg:basis-1/2 mt-10 p-5'>
            <ImageSelector />
          </div>
          <div className='h-full lg:h-[75%] lg:basis-1/2 mt-10 p-5'>
            <StringArtCreator />
          </div>
        </div>
        <hr className="border-white my-10 w-full" />
        <div className="flex flex-col lg:flex-row h-screen">
          <ManualStringArtCreator />
        </div>
      </div>
    </ApplicationContextProvider>
  );
};

export default Home;
