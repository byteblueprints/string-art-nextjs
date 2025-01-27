"use client";

import { AppContext, DrawingContext } from '@/app/context_provider';
import React, { useContext } from 'react';
import { FaAngleLeft } from 'react-icons/fa';

const LeftStep: React.FC = () => {
  const { state: appState } = useContext(AppContext);
  const { state: drawingState, updateState: updateDrawingState } = useContext(DrawingContext);

  const left = () => {
    if (drawingState.currentIndex === 0) {
      return;
    }
    updateDrawingState((prev) => {
      const previousIndex = prev.currentIndex;
      const newIndex = prev.currentIndex - 1;
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
      onClick={() => left()}
      disabled={!drawingState.startManualThreading || !appState.manualDrawingPosible}
    >
      <FaAngleLeft />
    </button>
  );
};

export default LeftStep;
