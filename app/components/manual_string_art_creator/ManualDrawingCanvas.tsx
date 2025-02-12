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
import { ControlDirection } from "@/app/types/enum/ControlDirection";

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

  /*#################################################*/
  // const drawingQueue = [];
  // let isProcessing = false;

  // // Batch size to process multiple lines in one go
  // const BATCH_SIZE = 10;

  // // Queue processor
  // function processQueue() {
  //   if (isProcessing || drawingQueue.length === 0) return;

  //   isProcessing = true;

  //   // Process a batch of lines
  //   const jobs = drawingQueue.splice(0, BATCH_SIZE); // Take up to BATCH_SIZE jobs
  //   Promise.all(
  //     jobs.map((job) =>
  //       Promise.resolve(job()).catch((error) => {
  //         console.error("Error processing drawing job:", error);
  //       })
  //     )
  //   )
  //     .then(() => {
  //       isProcessing = false;
  //       processQueue(); // Continue processing remaining jobs
  //     })
  //     .catch((error) => {
  //       console.error("Error processing batch:", error);
  //       isProcessing = false;
  //       processQueue();
  //     });
  // }

  // function addDrawingJob(jobFunction) {
  //   drawingQueue.push(jobFunction);
  //   processQueue();
  // }

  // // --- useEffect Integration ---
  // useEffect(() => {
  //   const { currentIndex, previousIndex } = drawingState;

  //   const direction =
  //     currentIndex > previousIndex
  //       ? ControlDirection.RIGHT
  //       : ControlDirection.LEFT;

  //   // Add all intermediate lines to the queue
  //   const start = previousIndex;
  //   const end = currentIndex;

  //   if (direction === ControlDirection.RIGHT) {
  //     for (let i = start + 1; i <= end; i++) {
  //       addDrawingJob(() => {
  //         return new Promise<void>((resolve) => {
  //           handleDrawLine(direction, i); // Draw the line for index `i`
  //           resolve();
  //         });
  //       });
  //     }
  //   } else {
  //     for (let i = start - 1; i >= end; i--) {
  //       addDrawingJob(() => {
  //         return new Promise<void>((resolve) => {
  //           handleDrawLine(direction, i); // Draw the line for index `i`
  //           resolve();
  //         });
  //       });
  //     }
  //   }
  // }, [drawingState.currentIndex]);

  /*#################################################*/
  useEffect(() => {
    if (drawingState.currentIndex > drawingState.previousIndex) {
      handleDrawLine(ControlDirection.RIGHT, drawingState.currentIndex);
    } else {
      handleDrawLine(ControlDirection.LEFT, drawingState.currentIndex);
    }
  }, [drawingState.currentIndex]);

  const handleDrawLine = (direction: ControlDirection.LEFT | ControlDirection.RIGHT, index: number) => {
    if (!drawingState.startManualThreading || !drawingState.drawnImage) return;

    const currentIndex = index;
    const getScaledPoint = (index: number) => ({
      x: Math.round(drawingState.nailsCoordinates[appState.nailSequence[index]][0]) * OUTPUT_SCALING_FACTOR,
      y: Math.round(drawingState.nailsCoordinates[appState.nailSequence[index]][1]) * OUTPUT_SCALING_FACTOR,
    });
    let targetWithLine = drawingState.drawnImage;
    if (direction === ControlDirection.RIGHT && currentIndex >= 0) {
      targetWithLine = drawBreshenHamLineWithColor(
        drawingState.drawnImage,
        getScaledPoint(currentIndex),
        getScaledPoint(currentIndex + 1),
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
    } else if (direction === ControlDirection.LEFT && currentIndex >= 0) {
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
