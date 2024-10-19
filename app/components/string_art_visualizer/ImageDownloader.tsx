"use client";

import React from 'react';
import { FaDownload } from 'react-icons/fa6';

interface Props {
    image: ImageData | null
    downloadDisabled: boolean
}


const ImageDownloader: React.FC<Props> = (props: Props) => {
    const { image, downloadDisabled } = props

    const handleDownload = () => {
        if (image) {
            const offscreenCanvas = new OffscreenCanvas(image.width, image.height);
            const offScreenContext = offscreenCanvas.getContext('2d');
            if (!offScreenContext) {
                throw new Error('2D context not available');
            }

            offScreenContext.putImageData(image, 0, 0);

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

    const downloadFinalImage = (targetResized: ImageData) => {

    }
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

export default ImageDownloader;
