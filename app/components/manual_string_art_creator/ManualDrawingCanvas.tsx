"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { drawBreshenHamLineWithColor } from "@/app/algorithm/BresenhamAlgorithm";
import { NailsCoordinatesCalculator } from "@/app/algorithm/NailsCoordinatesCalculator";
import { AppContext, DrawingContext } from "@/app/context_provider";
import {
  createTempCanvas,
  drawNailsWithNumbers,
  resizeImage,
  setCSSDimentions
} from "@/app/utils/CanvasOperations";
import { MANUAL_DRAW_PADDING, OUTPUT_SCALING_FACTOR } from "@/app/Constants";
import { createImageData } from "@/app/utils/ImageUtils";

const ManualDrawingCanvas: React.FC = () => {
  const { state: appState } = useContext(AppContext);
  const { state: drawingState, updateState: updateDrawingState } = useContext(DrawingContext);

  const canvasReference = useRef<HTMLCanvasElement>(null);

const initializeCanvasState = (canvas: HTMLCanvasElement) => {
  const calculator = new NailsCoordinatesCalculator(
    canvas.clientWidth / 2,
    canvas.clientHeight / 2,
    canvas.clientWidth / 2 - MANUAL_DRAW_PADDING
  );

  const nailsCoordinates = calculator.getNailsCoordinates(appState.configurations.numOfNails);
  const drawnImage = createImageData(
    canvas.clientWidth * OUTPUT_SCALING_FACTOR,
    canvas.clientHeight * OUTPUT_SCALING_FACTOR,
    255
  );

  updateDrawingState((prev) => ({
    ...prev,
    nailsCoordinates,
    drawnImage,
  }));
};

useEffect(() => {
  if (!appState.manualDrawingPosible && canvasReference.current) {
    initializeCanvasState(canvasReference.current);
  }
}, [appState.manualDrawingPosible]);

useEffect(() => {
  if (canvasReference.current) {
    initializeCanvasState(canvasReference.current);
  }
}, [appState.configurations.numOfNails]);


  useEffect(() => {
    const drawCanvas = async () => {
      if (canvasReference.current && drawingState.drawnImage) {
        const canvas = canvasReference.current;
        setCSSDimentions(canvas);
        const tempCanvas = createTempCanvas(drawingState.drawnImage);

        try {
          await resizeImage(tempCanvas, canvas);
          drawNailsWithNumbers(drawingState.nailsCoordinates, canvas);
        } catch (error) {
          console.error("Error during resizing with Pica: ", error);
        }
      }
    };

    drawCanvas();
  }, [drawingState.drawnImage]);

  useEffect(() => {
    if (drawingState.currentIndex > drawingState.previousIndex) {
      handleDrawLine(1);
    } else {
      handleDrawLine(-1);
    }
  }, [drawingState.currentIndex]);

  const handleDrawLine = (direction: 1 | -1) => {
    if (!drawingState.startManualThreading || !drawingState.drawnImage) return;

    const currentIndex = drawingState.currentIndex;
    const getScaledPoint = (index: number) => ({
      x: Math.round(drawingState.nailsCoordinates[appState.nailSequence[index]][0]) * OUTPUT_SCALING_FACTOR,
      y: Math.round(drawingState.nailsCoordinates[appState.nailSequence[index]][1]) * OUTPUT_SCALING_FACTOR,
    });
    let targetWithLine = drawingState.drawnImage;
    if (direction === 1 && currentIndex >= 0) {
      targetWithLine = drawBreshenHamLineWithColor(
        drawingState.drawnImage,
        getScaledPoint(currentIndex),
        getScaledPoint(currentIndex + direction),
        { r: 255, g: 0, b: 0 }
      );
      if (currentIndex > 0) {
        targetWithLine = drawBreshenHamLineWithColor(
          drawingState.drawnImage,
          getScaledPoint(currentIndex - 1),
          getScaledPoint(currentIndex),
          { r: 0, g: 0, b: 0 }
        );
      }
    } else if (direction === -1 && currentIndex >= 0) {
      targetWithLine = drawBreshenHamLineWithColor(
        drawingState.drawnImage,
        getScaledPoint(currentIndex),
        getScaledPoint(currentIndex + 1),
        { r: 255, g: 0, b: 0 }
      );
      targetWithLine = drawBreshenHamLineWithColor(
        drawingState.drawnImage,
        getScaledPoint(currentIndex + 1),
        getScaledPoint(currentIndex + 2),
        { r: 255, g: 255, b: 255 }
      );
    }
    updateDrawingState((prev) => {
      return {
        ...prev,
        drawnImage: new ImageData(
          new Uint8ClampedArray(targetWithLine.data),
          targetWithLine.width,
          targetWithLine.height
        )
      };
    });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full pt-24 lg:pt-0 p-5">
      <canvas
        ref={canvasReference}
        className="w-full aspect-square bg-white border-2 border-gray-300 rounded-2xl"
      />
    </div>
  );
};

export default ManualDrawingCanvas;
