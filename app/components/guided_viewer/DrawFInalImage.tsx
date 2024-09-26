"use client";

import React, { useState } from 'react';

interface Props {
  setConstructedFinal: React.Dispatch<React.SetStateAction<ImageData | null>>;
  finalStringArt: ImageData | null;
  constructedFinal: ImageData | null;
  target: ImageData | null;
}

const DrawFinalImage: React.FC<Props> = (props: Props) => {
  const { setConstructedFinal, finalStringArt, constructedFinal, target } = props;
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
    setIsChecked(event.target.checked);
    finalView(event.target.checked);
  };
  const finalView = async (checked: boolean | ((prevState: boolean) => boolean) | undefined) => {
    if (finalStringArt && checked) {      
      setConstructedFinal(finalStringArt);
    } else {
      if (target) {
        const newImageData = new ImageData(
          new Uint8ClampedArray(target.data), 
          target.width, 
          target.height
        );

        setConstructedFinal(newImageData);      
      } else {
        setConstructedFinal(null)
      }
    }
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-blue-600"
        onChange={handleCheckboxChange}
        checked={isChecked}
      />
      <span className="ml-2 text-gray-700">Toggle final view</span>
    </label>
  );
};

export default DrawFinalImage;
