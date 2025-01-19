import { createContext, ReactNode, useState } from "react";
import { DEFAULT_MAX_LINE_COUNT, DEFAULT_NUM_OF_NAILS, DEFAULT_STRING_WEIGHT } from "./utils/Constants";
import { ApplicationContext } from './types/ApplicationContext';

export const defaultApplicationContext: ApplicationContext = {
    imgXPos: 0,
    imgYPos: 0,
    imgScale: 1,
    selectedImage: null,
    nailSequence: [],
    finalStringArt: null,
    stringArtInProgress: false,
    configurations: {
        numOfNails: DEFAULT_NUM_OF_NAILS,
        stringWeight: DEFAULT_STRING_WEIGHT,
        maxLineCount: DEFAULT_MAX_LINE_COUNT,
    },
};
export const AppContext = createContext<{
    state: ApplicationContext;
    updateState: React.Dispatch<React.SetStateAction<ApplicationContext>>;
}>({
    state: defaultApplicationContext,
    updateState: () => {},
});

export const ApplicationContextProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
    const [state, updateState] = useState<ApplicationContext>(defaultApplicationContext);

    return (
        <AppContext.Provider value={{ state, updateState }}>
            {children}
        </AppContext.Provider>
    );
};