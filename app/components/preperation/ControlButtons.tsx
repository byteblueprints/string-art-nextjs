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
  setImgXPos: React.Dispatch<React.SetStateAction<number>>
  setImgYPos: React.Dispatch<React.SetStateAction<number>>
  setImgScale: React.Dispatch<React.SetStateAction<number>>
  selectedImage: HTMLImageElement | null
  setNumOfNails: React.Dispatch<React.SetStateAction<number>>
  setStringWeight: React.Dispatch<React.SetStateAction<number>>
  setMaxLineCount: React.Dispatch<React.SetStateAction<number>>
}


const ControlButtons: React.FC<Props> = ((props: Props) => {
  const { zoomIn, zoomOut, resetTransform, setTransform } = useControls();
  const [showConfig, setShowConfig] = useState(false);
  const { setImgXPos, setImgYPos, setImgScale, selectedImage, setNumOfNails, setStringWeight, setMaxLineCount } = props
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [s, setS] = useState(1);
  const [non, setNon] = useState(250);
  const [sw, setSw] = useState(20);
  const [mlc, setMlc] = useState(4000);

  useEffect(() => {
    setNumOfNails(non)
    setStringWeight(sw)
    setMaxLineCount(mlc)
  }, [non, sw, mlc])

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
    <div className="absolute bottom-0 flex space-x-2 p-4">
      <button
        onClick={() => zoomIn()}
        className="p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all"
      >
        <FaPlus />
      </button>
      <button
        onClick={() => zoomOut()}
        className="p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all"
      >
        <FaMinus />
      </button>
      <button
        onClick={() => resetTransform()}
        className="p-3 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-all"
      >
        <FaXmark />
      </button>
      <button
        onClick={() => transform(ControlType.LEFT)}
        className="p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all"
      >
        <FaAngleLeft />
      </button>
      <button
        onClick={() => transform(ControlType.RIGHT)}
        className="p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all"
      >
        <FaAngleRight />
      </button>
      <button
        onClick={() => transform(ControlType.UP)}
        className="p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all"
      >
        <FaAngleUp />
      </button>
      <button
        onClick={() => transform(ControlType.DOWN)}
        className="p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all"
      >
        <FaAngleDown />
      </button>
      <button
        onClick={() => setShowConfig(!showConfig)}
        className="p-3 bg-gray-500 text-white rounded-full shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-all"
      >
        <FaCog />
      </button>
      {showConfig && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Configuration</h2>
            <div className="mb-4">
              <label className="block mb-1">Number of Nails</label>
              <input
                type="number"
                value={non}
                onChange={(e) => setNon(Number(e.target.value))}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">String Weight</label>
              <input
                type="number"
                value={sw}
                onChange={(e) => setSw(Number(e.target.value))}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Max Line Count</label>
              <input
                type="number"
                value={mlc}
                onChange={(e) => setMlc(Number(e.target.value))}
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
    </div>

  );
});

export default ControlButtons;
