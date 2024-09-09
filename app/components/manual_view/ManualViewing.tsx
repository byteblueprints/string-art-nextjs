import { ControlType } from '@/app/types/enum/ControlType';
import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface Props {
  nailSequence: number[];
  setStartManualThreading: React.Dispatch<React.SetStateAction<boolean>>;
  setControlType: React.Dispatch<React.SetStateAction<ControlType>>;
  setNailSequenseIndex: React.Dispatch<React.SetStateAction<number>>;
}

const ManualViewing: React.FC<Props> = (props: Props) => {
  const { nailSequence, setStartManualThreading, setControlType, setNailSequenseIndex } = props;
  const [isManualThreading, setIsManualThreading] = useState(false);
  const [index, setIndex] = useState(0);

  const right = () => {
    if (isManualThreading) {
      setControlType(ControlType.RIGHT);
      setNailSequenseIndex(index + 1);
      setIndex(index + 1);
    }
  };

  const left = () => {
    if (isManualThreading) {
      setControlType(ControlType.LEFT);
      setNailSequenseIndex(index - 1);
      setIndex(index - 1);
    }
  };

  const start = () => {
    setStartManualThreading(true);
    setIsManualThreading(true);
  };

  return (
    <div className="flex flex-col w-full h-full p-4">
      <div className="mb-4 text-lg font-semibold text-black">
        Current Nail: {nailSequence[index] || 'None'}
      </div>
      <div className="flex-grow flex justify-center items-center bg-gray-100 border border-gray-300 mb-4">
        <div className="w-full max-w-[800px] h-[800px] bg-white border border-gray-300">
          {/* Canvas for drawing lines */}
        </div>
      </div>
      <div className="flex space-x-4">
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => start()}
        >
          Start Manual Threading
        </button>
        <button 
          className={`bg-blue-500 text-white px-4 py-2 rounded ${isManualThreading ? '' : 'opacity-50 cursor-not-allowed'}`}
          onClick={() => right()}
          disabled={!isManualThreading}
        >
          <FaAngleLeft />
        </button>
        <button 
          className={`bg-blue-500 text-white px-4 py-2 rounded ${isManualThreading ? '' : 'opacity-50 cursor-not-allowed'}`}
          onClick={() => left()}
          disabled={!isManualThreading}
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

export default ManualViewing;
