"use client";

import { NailsCoordinatesCalculator } from '@/app/algorithm/NailsCoordinatesCalculator';
import { AppContext, DrawingContext } from '@/app/context_provider';
import { createTempCanvas, drawNailsWithNumbers, resizeImage, resizeImageWithPadding, setCSSDimentions } from '@/app/utils/CanvasOperations';
import { MANUAL_DRAW_PADDING } from '@/app/utils/constants';
import React, { useContext, useEffect, useRef } from 'react';

const FinalStringArt: React.FC = () => {
  const { state: appState } = useContext(AppContext);
  const { state: drawingState } = useContext(DrawingContext);
  const canvasReference = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasReference && canvasReference.current && appState.finalStringArt) {
      const canvas = canvasReference.current;
      const calculator = new NailsCoordinatesCalculator((canvas.clientWidth / 2), (canvas.clientHeight / 2), (canvas.clientWidth / 2) - MANUAL_DRAW_PADDING);
      const nailsCoordinates = calculator.getNailsCoordinates(appState.configurations.numOfNails);
      setCSSDimentions(canvas);
      const tempCanvas = createTempCanvas(appState.finalStringArt);
      resizeImageWithPadding(tempCanvas, canvas)
        .then(() => drawNailsWithNumbers(nailsCoordinates, canvas))
        .catch((error) => {
          console.error("Error during resizing with Pica: ", error);
        });
    }
  }, [drawingState.showFinalStringArt]);

  return (
    <div className="flex flex-col justify-center items-center w-full pt-24 lg:pt-0 p-5">
      <canvas ref={canvasReference} className="w-full aspect-square bg-white border-2 border-gray-300 rounded-2xl" />
    </div>
  );
};

export default FinalStringArt;
