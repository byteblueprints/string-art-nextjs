"use client";

import { LinesPreCalculator } from '@/app/algorithm/LinesPreCalculator';
import { StringArtDrawer as GreedyBestLineFinder } from '@/app/algorithm/StringArtDrawer';
import { AppContext } from '@/app/context_provider';
import React, { RefObject, useContext, useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';

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
    const [stringArtLineCount, setStringArtLineCount] = useState<number>(0)
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
        setStringArtLineCount(0)
        setPreCalcLineCount(0)
        setStartDrawing(false)
        setLineCalculated(false)
    }, [viewedImage])

    useEffect(() => {
        if (lineCalculated) {
            setStartDrawing(true)
            let greedyBestLineFinder = new GreedyBestLineFinder()
            greedyBestLineFinder.startFindingBestLines(
                canvasRef,
                state.configurations.maxLineCount,
                state.configurations.stringWeight,
                setStringArtLineCount,
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
            <ProgressBar startDrawing={startDrawing} preCalcLineCount={preCalcLineCount} stringArtLineCount={stringArtLineCount}/>
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
