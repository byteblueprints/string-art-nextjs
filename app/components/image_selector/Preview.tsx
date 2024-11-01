"use client";

import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import Controls from "./Controls";
import Mask from "./Mask";
import PreviewCanvas from "./PreviewCanvas";

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
    stringArtInProgress: boolean
}
const Preview: React.FC<Props> = (props: Props) => {
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
        stringArtInProgress
    } = props
    return (
        <>
            <Mask />
            <div className="absolute h-full aspect-square top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <TransformWrapper
                    initialScale={1}
                    initialPositionX={0}
                    initialPositionY={0}
                    smooth={false}
                    disabled={stringArtInProgress}
                >
                    <TransformComponent>
                        <PreviewCanvas selectedImage={selectedImage} />
                    </TransformComponent>
                    <Controls
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
                        stringArtInProgress={stringArtInProgress}
                    />
                </TransformWrapper>
            </div>
        </>
    );
};

export default Preview;
