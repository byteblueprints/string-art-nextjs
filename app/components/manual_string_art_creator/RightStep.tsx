"use client";

import { AppContext, DrawingContext } from '@/app/context_provider';
import React, { useContext, useEffect } from 'react';
import { FaAngleRight } from 'react-icons/fa';


const RightStep: React.FC = () => {  
  const { state: appState } = useContext(AppContext);
  const { state: drawingState, updateState: updateDrawingState } = useContext(DrawingContext);

  useEffect(() => {
    if (drawingState.startManualThreading && !appState.stringArtInProgress) {
      right()
    }
  }, [drawingState.startManualThreading])

  const right = async () => {
    if (appState.configurations.maxLineCount === drawingState.currentIndex + 1) {
      return;      
    }
    updateDrawingState((prev) => {
      const previousIndex = prev.currentIndex;
      const newIndex = prev.currentIndex + 1;
      return {
        ...prev,
        currentIndex: newIndex,
        previousIndex: previousIndex,
      };
    });
  };
  return (
    <button
      className={`bg-blue-500 text-white px-4 py-2 rounded-full ${drawingState.startManualThreading ? '' : 'opacity-50 cursor-not-allowed'}`}
      onClick={() => right()}
      disabled={!drawingState.startManualThreading || !appState.manualDrawingPosible}
    >
      <FaAngleRight />
    </button>
  );
};

export default RightStep;
