"use client";

import { AppContext } from "@/app/context_provider";
import { ControlDirection } from "@/app/types/enum/ControlDirection";
import { useContext, useEffect, useState } from "react";
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
import Configurations from "./Configurations";

const Controls: React.FC = (() => {
  const { state, updateState } = useContext(AppContext);

  const { zoomIn, zoomOut, resetTransform, setTransform } = useControls();
  const [showConfig, setShowConfig] = useState(false);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [s, setS] = useState(1);

  const transform = (control_type: ControlDirection) => {
    switch (control_type) {
      case ControlDirection.LEFT:
        setX(x - 1);
        break;
      case ControlDirection.RIGHT:
        setX(x + 1);
        break;
      case ControlDirection.UP:
        setY(y - 1);
        break;
      case ControlDirection.DOWN:
        setY(y + 1);
        break;
      default:
        throw new Error("Unknown control type");
    }
    setTransform(x, y, s);
  };
  useTransformEffect(({ state }) => {
    updateState((prev) => ({
      ...prev,
      imgXPos: state.positionX,
      imgYPos: state.positionY,
      imgScale: state.scale,
    }));
  });
  useEffect(() => {
    resetTransform()
  }, [state.selectedImage])
  return (
    <>
      <div className="absolute flex flex-row bottom-0 space-x-2 p-4 left-1/2 transform -translate-x-1/2">
        <button
          disabled={state.stringArtInProgress}
          onClick={() => zoomIn()}
          className="p-1.5 md:p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all"
        >
          <FaPlus />
        </button>
        <button
          disabled={state.stringArtInProgress}
          onClick={() => zoomOut()}
          className="p-1.5 md:p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all"
        >
          <FaMinus />
        </button>
        <button
          disabled={state.stringArtInProgress}
          onClick={() => resetTransform()}
          className="p-1.5 md:p-3 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-all"
        >
          <FaXmark />
        </button>
        <button
          disabled={state.stringArtInProgress}
          onClick={() => transform(ControlDirection.LEFT)}
          className="p-1.5 md:p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all"
        >
          <FaAngleLeft />
        </button>
        <button
          disabled={state.stringArtInProgress}
          onClick={() => transform(ControlDirection.RIGHT)}
          className="p-1.5 md:p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all"
        >
          <FaAngleRight />
        </button>
        <button
          disabled={state.stringArtInProgress}
          onClick={() => transform(ControlDirection.UP)}
          className="p-1.5 md:p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all"
        >
          <FaAngleUp />
        </button>
        <button
          disabled={state.stringArtInProgress}
          onClick={() => transform(ControlDirection.DOWN)}
          className="p-1.5 md:p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all"
        >
          <FaAngleDown />
        </button>
        <button
          disabled={state.stringArtInProgress}
          onClick={() => setShowConfig(!showConfig)}
          className="p-1.5 md:p-3 bg-gray-500 text-white rounded-full shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-all"
        >
          <FaCog />
        </button>
      </div>

      {showConfig && <Configurations setShowConfig={setShowConfig} />}
    </>
  );
});

export default Controls;
