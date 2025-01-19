"use client";

import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import Controls from "./Controls";
import Mask from "./Mask";
import PreviewCanvas from "./PreviewCanvas";
import { useContext } from "react";
import { AppContext } from "@/app/context_provider";

const Preview: React.FC = () => {
    const { state } = useContext(AppContext);

    return (
        <>
            <Mask />
            <div className="absolute h-full aspect-square top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <TransformWrapper
                    initialScale={1}
                    initialPositionX={0}
                    initialPositionY={0}
                    smooth={false}
                    disabled={state.stringArtInProgress}
                >
                    <TransformComponent>
                        <PreviewCanvas />
                    </TransformComponent>
                    <Controls />
                </TransformWrapper>
            </div>
        </>
    );
};

export default Preview;
