"use client";

import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import ControlButtons from "./ControlButtons";
import CircleMask from "./CircleMask";
import ImagePreviewCanvas from "./ImagePreviewCanvas";

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
const ImageVisualizer: React.FC<Props> = (props: Props) => {
    const {
        selectedImage,
        setImgXPos,
        setImgYPos,
        setImgScale,
        setNumOfNails,
        setStringWeight,
        setMaxLineCount,
        numOfNails,
        stringWeight,
        maxLineCount,
        threddingInProgress
    } = props
    return (
        <>
            <CircleMask />
            <div className="absolute h-full aspect-square top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <TransformWrapper
                    initialScale={1}
                    initialPositionX={0}
                    initialPositionY={0}
                    smooth={false}
                    disabled={threddingInProgress}
                >
                    <TransformComponent>
                        <ImagePreviewCanvas selectedImage={selectedImage} />
                    </TransformComponent>
                    <ControlButtons
                        setImgXPos={setImgXPos}
                        setImgYPos={setImgYPos}
                        setImgScale={setImgScale}
                        selectedImage={selectedImage}
                        setNumOfNails={setNumOfNails}
                        setStringWeight={setStringWeight}
                        setMaxLineCount={setMaxLineCount}
                        numOfNails={numOfNails}
                        maxLineCount={maxLineCount}
                        stringWeight={stringWeight}
                        threddingInProgress={threddingInProgress}
                    />
                </TransformWrapper>
            </div>
        </>
    );
};

export default ImageVisualizer;
