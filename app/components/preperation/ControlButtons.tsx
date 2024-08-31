"use client";

import { ControlType } from "@/app/types/enum/ControlType";
import { useState } from "react";
import {
  FaAngleDown,
  FaAngleLeft,
  FaAngleRight,
  FaAngleUp,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useControls, useTransformEffect } from "react-zoom-pan-pinch";

interface Props {
  setImgXPos: React.Dispatch<React.SetStateAction<number>>
  setImgYPos: React.Dispatch<React.SetStateAction<number>>
  setImgScale: React.Dispatch<React.SetStateAction<number>>
}


const ControlButtons: React.FC<Props> = (props: Props) => {
  const { zoomIn, zoomOut, resetTransform, setTransform } = useControls();
  const { setImgXPos, setImgYPos, setImgScale } = props
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
  return (
    <div className="tools" style={{ color: "black", position: "absolute" }}>
      <button onClick={() => zoomIn()}>
        <FaPlus />
      </button>
      <button onClick={() => zoomOut()}>
        <FaMinus />
      </button>
      <button onClick={() => resetTransform()}>
        <FaXmark />
      </button>
      <button onClick={() => transform(ControlType.LEFT)}>
        <FaAngleLeft />
      </button>
      <button onClick={() => transform(ControlType.RIGHT)}>
        <FaAngleRight />
      </button>
      <button onClick={() => transform(ControlType.UP)}>
        <FaAngleUp />
      </button>
      <button onClick={() => transform(ControlType.DOWN)}>
        <FaAngleDown />
      </button>
    </div>
  );
};

export default ControlButtons;
