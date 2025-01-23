"use client";

import { AppContext } from '@/app/context_provider';
import React, { useContext } from 'react';
import { FaDownload } from 'react-icons/fa6';

interface Props {
    downloadDisabled: boolean
}


const Downloader: React.FC<Props> = (props: Props) => {
    const { downloadDisabled } = props

    const { state } = useContext(AppContext);

    const handleDownload = () => {
        if (state.finalStringArt) {
            const offscreenCanvas = new OffscreenCanvas(state.finalStringArt.width, state.finalStringArt.height);
            const offScreenContext = offscreenCanvas.getContext('2d');
            if (!offScreenContext) {
                throw new Error('2D context not available');
            }

            offScreenContext.putImageData(state.finalStringArt, 0, 0);

            offscreenCanvas.convertToBlob().then(blob => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'image.png';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });
        }
    };
    
    return (
        <>
            <button
                onClick={handleDownload}
                className={`p-2 rounded-full ${!downloadDisabled ? 'bg-green-500' : 'bg-gray-400 cursor-not-allowed'
                    }`}
                disabled={downloadDisabled}
            >
                <FaDownload className="text-white" />
            </button>
        </>
    );
};

export default Downloader;
