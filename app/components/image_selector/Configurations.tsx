"use client";

import { AppContext } from "@/app/context_provider";
import { useContext } from "react";

interface Props {
  setShowConfig: React.Dispatch<React.SetStateAction<boolean>>;
}
const Configurations: React.FC<Props> = ((props: Props) => {
  let setShowConfig = props.setShowConfig
  
  const { state, updateState } = useContext(AppContext);
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded shadow-lg w-96">
          <h2 className="text-lg font-semibold mb-4">Configuration</h2>
          <div className="mb-4">
            <label className="block mb-1">Number of Nails</label>
            <input
              type="number"
              value={state.configurations.numOfNails}
              onChange={(e) =>
                updateState((prev) => ({
                  ...prev,
                  configurations: {
                    ...prev.configurations,
                    numOfNails: Number(e.target.value),
                  },
                }))}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">String Weight</label>
            <input
              type="number"
              value={state.configurations.stringWeight}
              onChange={(e) =>
                updateState((prev) => ({
                  ...prev,
                  configurations: {
                    ...prev.configurations,
                    stringWeight: Number(e.target.value),
                  },
                }))}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Max Line Count</label>
            <input
              type="number"
              value={state.configurations.maxLineCount}
              onChange={(e) =>
                updateState((prev) => ({
                  ...prev,
                  configurations: {
                    ...prev.configurations,
                    maxLineCount: Number(e.target.value),
                  },
                }))}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div className="flex">
            <button
              onClick={() => setShowConfig(false)}
              className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 transition-all mr-2"
            >
              Save
            </button>
            <button
              onClick={() => setShowConfig(false)}
              className="bg-red-500 text-white rounded-full px-4 py-2 hover:bg-red-600 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
});

export default Configurations;
