"use client";

import React from 'react';
import Preview from './Preview';
import Controls from './Controls';
import { ManualDrawingContextProvider } from '@/app/context_provider';

const ManualStringArtCreator: React.FC = () => {
  return (
    <>
      <ManualDrawingContextProvider>
        <div className="container flex">
          <div className="column w-1/2">
            <Preview />
          </div>
          <div className="column w-1/2">
            <Controls />
          </div>
        </div>
      </ManualDrawingContextProvider>
    </>
  );
};

export default ManualStringArtCreator;
