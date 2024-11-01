"use client";

import { useEffect, useState } from "react";

interface Props {
  setSelectedImage: React.Dispatch<React.SetStateAction<HTMLImageElement | null>>;
  stringArtInProgress: boolean
}

const FileChooser: React.FC<Props> = (props: Props) => {
  const {
    setSelectedImage,
    stringArtInProgress
  } = props
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
            setSelectedImage(img);
          };
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  useEffect(() => {
    const image = new Image();
    image.src = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/base.jpeg`;
    image.onload = () => {
      setSelectedImage(image)
    };
  }, [])
  return (
    <label className="flex flex-col items-center p-2 bg-blue-500 border border-blue-600 rounded-full cursor-pointer text-white hover:bg-blue-600 transition duration-300 text-center">
      <span className="w-1/2 text-xs font-medium md:text-sm md:font-medium whitespace-nowrap overflow-hidden text-ellipsis">
        Click to Upload (JPG, JPEG, PNG)
      </span>
      <input
        disabled={stringArtInProgress}
        type="file"
        accept="image/jpeg, image/jpg, image/png"
        onChange={file ? () => setFile(null) : handleFileChange}
        className="hidden"
      />
    </label>
  );
};

export default FileChooser;
