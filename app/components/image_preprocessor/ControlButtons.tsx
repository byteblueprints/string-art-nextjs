"use client";

import { ControlType } from "@/app/types/enum/ControlType";
import { useEffect, useState } from "react";
import {
  FaAngleDown,
  FaAngleLeft,
  FaAngleRight,
  FaAngleUp,
  FaCog,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useControls, useTransformEffect } from "react-zoom-pan-pinch";

interface Props {
  selectedImage: HTMLImageElement | null
  setImgXPos: React.Dispatch<React.SetStateAction<number>>
  setImgYPos: React.Dispatch<React.SetStateAction<number>>
  setImgScale: React.Dispatch<React.SetStateAction<number>>
  setNumOfNails: React.Dispatch<React.SetStateAction<number>>
  setStringWeight: React.Dispatch<React.SetStateAction<number>>
  setMaxLineCount: React.Dispatch<React.SetStateAction<number>>
  numOfNails: number
  stringWeight: number
  maxLineCount: number
  threddingInProgress: boolean
}


const ControlButtons: React.FC<Props> = ((props: Props) => {
  const { zoomIn, zoomOut, resetTransform, setTransform } = useControls();
  const [showConfig, setShowConfig] = useState(false);
  const {
    setImgXPos,
    setImgYPos,
    setImgScale,
    selectedImage,
    setNumOfNails,
    setStringWeight,
    setMaxLineCount,
    numOfNails,
    stringWeight,
    maxLineCount,
    threddingInProgress
  } = props
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [s, setS] = useState(1);

  const transform = (control_type: ControlType) => {
    switch (control_type) {
      case ControlType.LEFT:
        setX(x - 1);
        break;
      case ControlType.RIGHT:
        setX(x + 1);
        break;
      case ControlType.UP:
        setY(y - 1);
        break;
      case ControlType.DOWN:
        setY(y + 1);
        break;
      default:
        throw new Error("Unknown control type");
    }
    setTransform(x, y, s);
  };
  useTransformEffect(({ state, instance }) => {
    setImgXPos(state.positionX)
    setImgYPos(state.positionY)
    setImgScale(state.scale)
  });
  useEffect(() => {
    resetTransform()
  }, [selectedImage])
  return (
    <>
      <div className="absolute flex flex-row bottom-0 space-x-2 p-4 left-1/2 transform -translate-x-1/2">
        <button
          disabled={threddingInProgress}
          onClick={() => zoomIn()}
          className="p-1.5 md:p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all"
        >
          <FaPlus />
        </button>
        <button
          disabled={threddingInProgress}
          onClick={() => zoomOut()}
          className="p-1.5 md:p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all"
        >
          <FaMinus />
        </button>
        <button
          disabled={threddingInProgress}
          onClick={() => resetTransform()}
          className="p-1.5 md:p-3 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-all"
        >
          <FaXmark />
        </button>
        <button
          disabled={threddingInProgress}
          onClick={() => transform(ControlType.LEFT)}
          className="p-1.5 md:p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all"
        >
          <FaAngleLeft />
        </button>
        <button
          disabled={threddingInProgress}
          onClick={() => transform(ControlType.RIGHT)}
          className="p-1.5 md:p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all"
        >
          <FaAngleRight />
        </button>
        <button
          disabled={threddingInProgress}
          onClick={() => transform(ControlType.UP)}
          className="p-1.5 md:p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all"
        >
          <FaAngleUp />
        </button>
        <button
          disabled={threddingInProgress}
          onClick={() => transform(ControlType.DOWN)}
          className="p-1.5 md:p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all"
        >
          <FaAngleDown />
        </button>
        <button
          disabled={threddingInProgress}
          onClick={() => setShowConfig(!showConfig)}
          className="p-1.5 md:p-3 bg-gray-500 text-white rounded-full shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-all"
        >
          <FaCog />
        </button>
      </div>

      {showConfig && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Configuration</h2>
            <div className="mb-4">
              <label className="block mb-1">Number of Nails</label>
              <input
                type="number"
                value={numOfNails}
                onChange={(e) => setNumOfNails(Number(e.target.value))}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">String Weight</label>
              <input
                type="number"
                value={stringWeight}
                onChange={(e) => setStringWeight(Number(e.target.value))}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Max Line Count</label>
              <input
                type="number"
                value={maxLineCount}
                onChange={(e) => setMaxLineCount(Number(e.target.value))}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div className="flex">
              <button
                onClick={() => setShowConfig(false)}
                className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 transition-all mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setShowConfig(false)}
                className="bg-red-500 text-white rounded-full px-4 py-2 hover:bg-red-600 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default ControlButtons;
