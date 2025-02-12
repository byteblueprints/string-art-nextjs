"use client";

import { AppContext, defaultManualDrawingContext, DrawingContext } from "@/app/context_provider";
import { useContext, useEffect } from "react";
import LeftStep from "./LeftStep";
import RightStep from "./RightStep";
import DrawFinalImage from "./DrawFInalImage";

const Controls: React.FC = (() => {
  const { state: appState, updateState: updateAppState } = useContext(AppContext);
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
          drawImageUsingCSV: defaultManualDrawingContext.drawImageUsingCSV
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const nailsArray = content.split(",").map((nail) => parseInt(nail.trim(), 10)).filter(Number.isInteger);

      if (nailsArray.length > 0) {
        updateAppState((prev) => ({
          ...prev,
          manualDrawingPosible: true,
          nailSequence: nailsArray,
        }));
        updateDrawingState((prev) => ({
          ...prev,
          drawImageUsingCSV: true
        }));
      }
    };
    reader.readAsText(file);
  };
  return (
    <>
      <div className="h-full lg:h-[80%] lg:basis-1/2 mt-10 p-5 flex flex-col justify-center items-center">
        <div className="text-xs font-medium md:text-sm md:font-medium whitespace-nowrap overflow-hidden text-ellipsis text-black p-3">
          Current Step: {drawingState.currentIndex + 1}
        </div>
        <input
          type="range"
          min="0"
          max={appState.configurations.maxLineCount - 1}
          value={drawingState.currentIndex}
          onChange={(e) => {
            const newIndex = parseInt(e.target.value);
            updateDrawingState(prev => ({
              ...prev,
              currentIndex: newIndex,
            }));
          }}
          className="w-full mt-2 mb-4"
        />
        <div className="text-xs font-medium md:text-sm md:font-medium whitespace-nowrap overflow-hidden text-ellipsis text-black p-3">
          Starting Nail: {appState.nailSequence[drawingState.currentIndex] + 1} -{'>'} End Nail: {appState.nailSequence[drawingState.currentIndex + 1] + 1}
        </div>

        <button
          disabled={appState.stringArtInProgress || !appState.manualDrawingPosible}
          className={`bg-blue-500 text-white px-4 py-2 rounded-full ${appState.stringArtInProgress || !appState.manualDrawingPosible ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => start()}
        >
          Start Manual Viewing on Canvas
        </button>
        <div className="flex p-4 space-x-4 justify-center items-center bg-white">
          <LeftStep />
          <RightStep />
          <DrawFinalImage />
        </div>
        <hr className="border-gray-300 my-10 w-full" />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-full mb-4"
          onClick={() => {
            const csvContent = appState.nailSequence.join(',');
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'nail_sequence.csv';
            a.click();
            window.URL.revokeObjectURL(url);
          }}
        >
          Download Nail Sequence CSV
        </button>
        <label className="bg-gray-500 text-white px-4 py-2 rounded-full cursor-pointer">
          Load Nail Sequence From CSV
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>
    </>
  );
});

export default Controls;
