"use client";

import { AppContext, defaultManualDrawingContext, DrawingContext } from "@/app/context_provider";
import { useContext, useEffect } from "react";
import LeftStep from "./LeftStep";
import RightStep from "./RightStep";
import DrawFinalImage from "./DrawFInalImage";

const Controls: React.FC = (() => {
  const { state: appState } = useContext(AppContext);
  const { state: drawingState, updateState: updateDrawingState } = useContext(DrawingContext);

  useEffect(() => {
    if (!appState.manualDrawingPosible) {
      updateDrawingState((prev) => {
        return {
          ...prev,
          currentIndex: defaultManualDrawingContext.currentIndex,
          previousIndex: defaultManualDrawingContext.previousIndex,
          startManualThreading: defaultManualDrawingContext.startManualThreading,
          showFinalStringArt: defaultManualDrawingContext.showFinalStringArt,
        };
      });
    }
  }, [appState.manualDrawingPosible]);

  const start = async () => {
    updateDrawingState((prev) => {
      return {
        ...prev,
        startManualThreading: true,
      };
    });
  };
  return (
    <>
      <div className="h-full lg:h-[80%] lg:basis-1/2 mt-10 p-5 flex flex-col justify-center items-center">
        <div className="text-xs font-medium md:text-sm md:font-medium whitespace-nowrap overflow-hidden text-ellipsis text-black p-3">
          Current Step: {drawingState.currentIndex + 1}
        </div>
        <div className="text-xs font-medium md:text-sm md:font-medium whitespace-nowrap overflow-hidden text-ellipsis text-black p-3">
          Starting Nail: {appState.nailSequence[drawingState.currentIndex] + 1} -{'>'} End Nail: {appState.nailSequence[drawingState.currentIndex + 1] + 1}
        </div>

        <button
          disabled={appState.stringArtInProgress || !appState.manualDrawingPosible}
          className="bg-blue-500 text-white px-4 py-2 rounded-full"
          onClick={() => start()}
        >
          Start Manual Threading
        </button>
        <div className="flex p-4 space-x-4 justify-center items-center bg-white">
          <LeftStep />
          <RightStep />
          <DrawFinalImage />
        </div>
      </div>
    </>
  );
});

export default Controls;
