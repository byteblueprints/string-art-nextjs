"use client";

import { Storage } from '@/app/algorithm/Storage';
import { LinesPreCalculator } from '@/app/algorithm/LinesPreCalculator';
import { StringArtDrawer } from '@/app/algorithm/StringArtDrawer';
import React, { RefObject, useEffect, useState } from 'react';

interface Props {
    canvasRef: RefObject<HTMLCanvasElement>
    setNailSequence: React.Dispatch<React.SetStateAction<number[]>>
    setViewedImage: React.Dispatch<React.SetStateAction<ImageData | null>>
    numOfNails: number
    maxLineCount: number
    stringWeight: number
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
        stringWeight
    } = props

    const [nailesCordinates, setNailsCordinates] = useState<[number, number][] | []>([])
    const [lineCalculated, setLineCalculated] = useState<boolean>(false)
    const [count, setCount] = useState<number>(0)


    useEffect(() => {
        if (lineCalculated) {
            if (canvasRef.current) {
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
                            setViewedImage
                        )
                    })
                }
            }
        }
    }, [lineCalculated])

    async function startThreading() {
        let algorithm = new LinesPreCalculator()
        await algorithm.startThreading(
            numOfNails,
            setLineCalculated
        )
    }

    return (
        <>
            <div className="relative w-full bg-gray-200 rounded-full h-4">
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
            <button
                onClick={() => startThreading()}
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all"
            >
                Start Threading
            </button>
        </>
    );
};

export default Threadder;
