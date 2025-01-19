"use client";

import React, { } from "react";
import FileChooser from "./FileChooser";
import Preview from "./Preview";

const ImageSelector: React.FC = () => {
  return (
    <div className="flex flex-col h-full relative">
      <div className="relative h-full">
        <Preview />
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[120%]">
        <FileChooser />
      </div>
    </div>
  );
};

export default ImageSelector;

