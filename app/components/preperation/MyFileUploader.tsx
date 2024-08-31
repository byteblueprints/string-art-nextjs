"use client";

import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const MyFileUploader: React.FC = () => {
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [file, setFile] = useState(null);
  const handleChange = (file: any) => {
    setFile(file);
  };
  return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
  );
};

export default MyFileUploader;