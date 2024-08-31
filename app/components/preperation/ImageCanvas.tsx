"use client";

import { useEffect, useRef, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import ControlButtons from "./ControlButtons";
import { assert } from "console";
import ImagePreviewCanvasMask from "./ImagePreviewCanvasMask";
import ImagePreviewCanvas from "./ImagePreviewCanvas";

interface Props {
    setImgXPos: React.Dispatch<React.SetStateAction<number>>
    setImgYPos: React.Dispatch<React.SetStateAction<number>>
    setImgScale: React.Dispatch<React.SetStateAction<number>>
    setImage: React.Dispatch<React.SetStateAction<HTMLImageElement | null>>
}
const ImageCanvas: React.FC<Props> = (props: Props) => {
    const { setImgXPos, setImgYPos, setImgScale, setImage } = props
    return (
        <>
            <div className="image-container" style={{ position: "relative" }}>
                <ImagePreviewCanvasMask />
                <TransformWrapper
                    initialScale={1}
                    initialPositionX={0}
                    initialPositionY={0}
                >
                    <TransformComponent>
                        <ImagePreviewCanvas setImage={setImage} />
                    </TransformComponent>
                    <ControlButtons setImgXPos={setImgXPos} setImgYPos={setImgYPos} setImgScale={setImgScale} />
                </TransformWrapper>
            </div>
        </>
    );
};

export default ImageCanvas;
