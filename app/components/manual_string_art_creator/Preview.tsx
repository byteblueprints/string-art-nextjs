"use client";

import { useContext } from "react";
import FinalStringArt from "./FinalStringArt";
import ManualDrawingCanvas from "./ManualDrawingCanvas";
import { DrawingContext } from "@/app/context_provider";

const Preview: React.FC = () => {
    const { state } = useContext(DrawingContext);
    
    return (
        <>
            <div className="h-full lg:h-[80%] lg:basis-1/2 mt-10 p-5">
                <div className="flex flex-col justify-center items-center w-full pt-24 lg:pt-0 p-5">
                    {state.showFinalStringArt ? (
                        <FinalStringArt />
                    ) : (
                        <ManualDrawingCanvas />
                    )}
                </div>
            </div>
        </>
    );
};

export default Preview;
