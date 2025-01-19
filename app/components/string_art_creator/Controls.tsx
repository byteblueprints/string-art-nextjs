"use client";

import { LinesPreCalculator } from '@/app/algorithm/LinesPreCalculator';
import { StringArtDrawer as GreedyBestLineFinder } from '@/app/algorithm/StringArtDrawer';
import { AppContext } from '@/app/context_provider';
import { MIN_DISTANCE } from '@/app/utils/Constants';
import React, { RefObject, useContext, useEffect, useState } from 'react';

interface Props {
    canvasRef: RefObject<HTMLCanvasElement>
}
const Controls: React.FC<Props> = (props: Props) => {
    const {
        canvasRef,
    } = props
    const { state, updateState } = useContext(AppContext);
    const [lineCalculated, setLineCalculated] = useState<boolean>(false)
    const [startDrawing, setStartDrawing] = useState<boolean>(false)
    const [stringArtInProgress, setStringArtInProgress] = useState<boolean>(false)
    const [preCalcLineCount, setPreCalcLineCount] = useState<number>(0)
    const [count, setCount] = useState<number>(0)
    const [nailSequence, setNailSequence] = useState<number[]>([])
    const [viewedImage, setViewedImage] = useState<ImageData | null>(null)


    useEffect(() => {
        updateState((prev) => ({
            ...prev,
            stringArtInProgress: stringArtInProgress,
        }));
    }, [stringArtInProgress])

    useEffect(() => {
        updateState((prev) => ({
            ...prev,
            nailSequence: nailSequence,
        }));
    }, [nailSequence])

    useEffect(() => {
        updateState((prev) => ({
            ...prev,
            finalStringArt: viewedImage,
        }));
    }, [viewedImage])

    useEffect(() => {
        if (lineCalculated) {
            setStartDrawing(true)
            let greedyBestLineFinder = new GreedyBestLineFinder()
            greedyBestLineFinder.startFindingBestLines(
                canvasRef,
                state.configurations.maxLineCount,
                state.configurations.stringWeight,
                setCount,
                setViewedImage,
                setNailSequence,
                setStringArtInProgress
            )
        }
    }, [lineCalculated])

    async function start() {
        if (canvasRef.current) {
            const canvas = canvasRef.current
            const startX = Math.floor(canvas.clientWidth / 2);
            const startY = Math.floor(canvas.clientHeight / 2);
            const radius = Math.floor((Math.min(canvas.clientWidth, canvas.clientHeight) / 2));
            setStringArtInProgress(true)
            let lineCalculator = new LinesPreCalculator()
            lineCalculator.preCalculateAllLines(
                state.configurations.numOfNails,
                setLineCalculated,
                setPreCalcLineCount,
                startX,
                startY,
                radius,
            )
        }
    }


    return (
        <>
            {!startDrawing ? (
                <>
                    <div className='flex flex-col items-center justify-cente'>
                        <div className="relative w-full bg-gray-200 rounded-full h-4 mb-4">
                            <div
                                className="bg-green-500 h-4 rounded-full"
                                style={{ width: `${(preCalcLineCount / ((state.configurations.numOfNails * state.configurations.numOfNails) - (state.configurations.numOfNails * MIN_DISTANCE))) * 100}%` }}
                            ></div>
                            <span
                                className="absolute inset-0 flex items-center justify-center text-black font-bold"
                                style={{ right: '0', paddingRight: '4px' }}
                            >
                                {`${Math.min((preCalcLineCount / ((state.configurations.numOfNails * state.configurations.numOfNails) - (state.configurations.numOfNails * MIN_DISTANCE))) * 100, 100).toFixed(0)}%`}
                            </span>
                        </div>
                        <div className="text-lg font-semibold text-gray-800">
                            All Posible Lines
                        </div>
                        <div className="text-lg font-semibold text-gray-800">
                            {preCalcLineCount}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex flex-col items-center">
                        <div className="relative w-full bg-gray-200 rounded-full h-4 mb-4">
                            <div
                                className="bg-green-500 h-4 rounded-full"
                                style={{ width: `${(count / state.configurations.maxLineCount) * 100}%` }}
                            ></div>
                            <span
                                className="absolute inset-0 flex items-center justify-center text-black font-bold"
                                style={{ right: '0', paddingRight: '4px' }}
                            >
                                {`${Math.min((count / state.configurations.maxLineCount) * 100, 100).toFixed(0)}%`}
                            </span>
                        </div>
                        <div className="text-lg font-semibold text-gray-800">
                            Viewed Thread Count
                        </div>
                        <div className="text-lg font-semibold text-gray-800">
                            {count}
                        </div>
                    </div>

                </>
            )}
            <div className='flex flex-col items-center justify-cente'>
                <button
                    disabled={stringArtInProgress}
                    onClick={() => start()}
                    className="w-1/2 px-6 py-2 bg-blue-500 text-white text-xs font-medium md:text-sm rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all"
                >
                    Start
                </button>
            </div>
        </>
    );
};

export default Controls;
