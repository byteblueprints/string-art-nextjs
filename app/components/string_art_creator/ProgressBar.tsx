"use client";

import { AppContext } from '@/app/context_provider';
import { MIN_DISTANCE } from '@/app/utils/Constants';
import React, { useContext } from 'react';

interface Props {
    startDrawing: boolean,
    preCalcLineCount: number
    stringArtLineCount: number
}
const ProgressBar: React.FC<Props> = (props: Props) => {
    const {
        startDrawing,
        preCalcLineCount,
        stringArtLineCount
    } = props
    const { state } = useContext(AppContext);

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
                            Calculating All Posible Lines
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
                                style={{ width: `${(stringArtLineCount / state.configurations.maxLineCount) * 100}%` }}
                            ></div>
                            <span
                                className="absolute inset-0 flex items-center justify-center text-black font-bold"
                                style={{ right: '0', paddingRight: '4px' }}
                            >
                                {`${Math.min((stringArtLineCount / state.configurations.maxLineCount) * 100, 100).toFixed(0)}%`}
                            </span>
                        </div>
                        <div className="text-lg font-semibold text-gray-800">
                            Viewing
                        </div>
                        <div className="text-lg font-semibold text-gray-800">
                            {stringArtLineCount}
                        </div>
                    </div>

                </>
            )}
        </>
    );
};

export default ProgressBar;
