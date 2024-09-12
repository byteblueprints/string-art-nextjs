"use client";

import { useRef } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import ControlButtons from "./ControlButtons";
import ImagePreviewCanvasMask from "./ImagePreviewCanvasMask";
import ImagePreviewCanvas from "./ImagePreviewCanvas";

interface Props {
    setImgXPos: React.Dispatch<React.SetStateAction<number>>
    setImgYPos: React.Dispatch<React.SetStateAction<number>>
    setImgScale: React.Dispatch<React.SetStateAction<number>>
    selectedImage: HTMLImageElement | null
}
const ImageCanvas: React.FC<Props> = (props: Props) => {
    const { setImgXPos, setImgYPos, setImgScale, selectedImage } = props
    return (
        <>
            <div className="container">
                <div className="flex flex-col items-center justify-center relative">                    
                    <ImagePreviewCanvasMask />
                    <TransformWrapper
                        initialScale={1}
                        initialPositionX={0}
                        initialPositionY={0}
                        smooth={false}
                    >
                        <TransformComponent>
                            <ImagePreviewCanvas selectedImage={selectedImage} />
                        </TransformComponent>
                        <ControlButtons setImgXPos={setImgXPos} setImgYPos={setImgYPos} setImgScale={setImgScale} selectedImage={selectedImage} />
                    </TransformWrapper>
                </div>
            </div>
        </>
    );
};

export default ImageCanvas;
