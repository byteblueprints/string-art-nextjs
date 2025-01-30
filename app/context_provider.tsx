import { createContext, ReactNode, useState } from "react";
import { DEFAULT_MAX_LINE_COUNT, DEFAULT_NUM_OF_NAILS, DEFAULT_STRING_WEIGHT } from "./utils/Constants";
import { ApplicationContext, ManualDrawingContext } from './types/ContextTypes';

// This defines the default application context, creates the application context, and provides the application context provider.
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
    manualDrawingPosible: false,
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

// This defines the default manual drawing context, creates the drawing context, and provides the manual drawing context provider.
export const defaultManualDrawingContext: ManualDrawingContext = {
    currentIndex: -1,
    previousIndex: -1,
    showFinalStringArt: false,
    startManualThreading: false,
    drawnImage: null,
    nailsCoordinates: [],
};
export const DrawingContext = createContext<{
    state: ManualDrawingContext;
    updateState: React.Dispatch<React.SetStateAction<ManualDrawingContext>>;
}>({
    state: defaultManualDrawingContext,
    updateState: () => {},
});
export const ManualDrawingContextProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
    const [state, updateState] = useState<ManualDrawingContext>(defaultManualDrawingContext);

    return (
        <DrawingContext.Provider value={{ state, updateState }}>
            {children}
        </DrawingContext.Provider>
    );
};