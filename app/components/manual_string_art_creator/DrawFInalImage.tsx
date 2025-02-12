"use client";

import { AppContext, DrawingContext } from '@/app/context_provider';
import React, { useContext, useEffect, useState } from 'react';

const DrawFinalImage: React.FC = () => {
  const { state: appState } = useContext(AppContext);
  const { state: drawingState, updateState: updateDrawingState } = useContext(DrawingContext);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
    setIsChecked(event.target.checked);
  };
  useEffect(() => {
    if (!appState.manualDrawingPosible) {
      setIsChecked(false);
    }
  }, [appState.manualDrawingPosible]);
  useEffect(() => {
    updateDrawingState((prev) => {
      return {
        ...prev,
        showFinalStringArt: isChecked,
      };
    });
  }, [isChecked]);

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        disabled={appState.stringArtInProgress || !appState.manualDrawingPosible || drawingState.drawImageUsingCSV}
        type="checkbox"
        className="form-checkbox h-5 w-5 text-blue-600"
        onChange={handleCheckboxChange}
        checked={isChecked}
      />
      <span className="ml-2 text-gray-700">Toggle final view</span>
    </label>
  );
};

export default DrawFinalImage;
