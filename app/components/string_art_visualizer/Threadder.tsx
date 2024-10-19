"use client";

import { LinesPreCalculator } from '@/app/algorithm/LinesPreCalculator';
import { StringArtDrawer } from '@/app/algorithm/StringArtDrawer';
import { MIN_DISTANCE } from '@/app/utils/constants';
import React, { RefObject, useEffect, useState } from 'react';

interface Props {
    canvasRef: RefObject<HTMLCanvasElement>
    setNailSequence: React.Dispatch<React.SetStateAction<number[]>>
    setViewedImage: React.Dispatch<React.SetStateAction<ImageData | null>>
    numOfNails: number
    maxLineCount: number
    stringWeight: number
    setThreddingInProgress: React.Dispatch<React.SetStateAction<boolean>>
    threddingInProgress: boolean
}


function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const Threadder: React.FC<Props> = (props: Props) => {
    const {
        maxLineCount,
        canvasRef,
        setNailSequence,
        setViewedImage,
        numOfNails,
        stringWeight,
        setThreddingInProgress,
        threddingInProgress
    } = props

    const [lineCalculated, setLineCalculated] = useState<boolean>(false)
    const [startDrawing, setStartDrawing] = useState<boolean>(false)
    const [preCalcLineCount, setPreCalcLineCount] = useState<number>(0)
    const [count, setCount] = useState<number>(0)


    useEffect(() => {
    }, [])

    useEffect(() => {
        if (lineCalculated) {
            if (canvasRef.current) {
                setStartDrawing(true)
                const ctx = canvasRef.current.getContext("2d");
                if (ctx != null) {
                    const dataURL = canvasRef.current.toDataURL();
                    const newImage = new Image();
                    newImage.src = dataURL;
                    sleep(100).then(() => {
                        ctx.globalCompositeOperation = 'source-over';
                        ctx.drawImage(newImage, 0, 0);

                        let stringArtDrawer = new StringArtDrawer()
                        stringArtDrawer.draw(
                            "string_art",
                            newImage,
                            maxLineCount,
                            stringWeight,
                            setCount,
                            setViewedImage,
                            setNailSequence,
                            setThreddingInProgress
                        )
                    })
                }
            }
        }
    }, [lineCalculated])

    async function startThreading() {
        setThreddingInProgress(true)
        let algorithm = new LinesPreCalculator()
        await algorithm.startThreading(
            numOfNails,
            setLineCalculated,
            setPreCalcLineCount
        )
    }

    return (
        <>
            {!startDrawing ? (
                <>
                    <div className='flex flex-col items-center justify-cente'>
                        <div className="relative w-full bg-gray-200 rounded-full h-4 mb-4">
                            <div
                                className="bg-green-500 h-4 rounded-full"
                                style={{ width: `${(preCalcLineCount / ((numOfNails * numOfNails) - (numOfNails * MIN_DISTANCE))) * 100}%` }}
                            ></div>
                            <span
                                className="absolute inset-0 flex items-center justify-center text-black font-bold"
                                style={{ right: '0', paddingRight: '4px' }}
                            >
                                {`${Math.min((preCalcLineCount / ((numOfNails * numOfNails) - (numOfNails * MIN_DISTANCE))) * 100, 100).toFixed(0)}%`}
                            </span>
                        </div>
                        <div className="text-lg font-semibold text-gray-800">
                            Pre calculated Line count: {preCalcLineCount}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="relative w-full bg-gray-200 rounded-full h-4 mb-4">
                        <div
                            className="bg-green-500 h-4 rounded-full"
                            style={{ width: `${(count / maxLineCount) * 100}%` }}
                        ></div>
                        <span
                            className="absolute inset-0 flex items-center justify-center text-black font-bold"
                            style={{ right: '0', paddingRight: '4px' }}
                        >
                            {`${Math.min((count / maxLineCount) * 100, 100).toFixed(0)}%`}
                        </span>
                    </div>
                    <div className="text-lg font-semibold text-gray-800">
                        Line count: {count}
                    </div>
                </>
            )}
            <div className='flex flex-col items-center justify-cente'>
                <button
                    disabled={threddingInProgress}
                    onClick={() => startThreading()}
                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all"
                >
                    Start Threading
                </button>
            </div>
        </>
    );
};

export default Threadder;
