"use client";

import React from 'react';

interface Props {
    count: number
    maxLineCount: number
}


const ThreadingProgressVisualizer: React.FC<Props> = (props: Props) => {
    const { count, maxLineCount } = props
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

        </>
    );
};

export default ThreadingProgressVisualizer;
