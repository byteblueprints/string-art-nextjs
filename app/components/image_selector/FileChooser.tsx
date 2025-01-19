"use client";

import { AppContext, defaultApplicationContext } from "@/app/context_provider";
import { BASE_IMAGE_FILE_NAME } from "@/app/utils/Constants";
import { useContext, useEffect, useState } from "react";

const FileChooser: React.FC = () => {
  const { state, updateState } = useContext(AppContext);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const img = new Image();
          img.src = reader.result as string;
          img.onload = () => {
            updateState((prev) => ({
              ...prev,
              selectedImage: img,
            }));
          };
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  useEffect(() => {
    const image = new Image();
    image.src = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/${BASE_IMAGE_FILE_NAME}`;
    image.onload = () => {
      updateState((prev) => ({
        ...prev,
        selectedImage: image,
      }));
    };
  }, [])

  const handleReset = () => {
    updateState(defaultApplicationContext);
    const image = new Image();
    image.src = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/${BASE_IMAGE_FILE_NAME}`;
    image.onload = () => {
      updateState((prev) => ({
        ...prev,
        selectedImage: image,
      }));
    };
  };


  return (
    <div className="space-y-4">
      <label className="flex flex-col items-center p-2 bg-blue-500 border border-blue-600 rounded-full cursor-pointer text-white hover:bg-blue-600 transition duration-300 text-center">
        <span className="w-1/2 text-xs font-medium md:text-sm md:font-medium whitespace-nowrap overflow-hidden text-ellipsis">
          Click to Upload (JPG, JPEG, PNG)
        </span>
        <input
          disabled={state.stringArtInProgress}
          type="file"
          accept="image/jpeg, image/jpg, image/png"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      <button
        onClick={handleReset}
        disabled={state.stringArtInProgress}
        className={`w-full flex items-center justify-center p-2 border rounded-full transition duration-300 ${
          state.stringArtInProgress
            ? "bg-gray-300 border-gray-400 text-gray-500 cursor-not-allowed"
            : "bg-red-500 border-red-600 text-white hover:bg-red-600 cursor-pointer"
        }`}
      >
        Reset
      </button>
    </div>
  );
};

export default FileChooser;
