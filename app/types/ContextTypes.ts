import { Confifurations } from "./Configurations";

export type ApplicationContext = {
    imgXPos: number
    imgYPos: number
    imgScale: number
    selectedImage: HTMLImageElement | null
    nailSequence: number[]
    finalStringArt: ImageData | null
    stringArtInProgress: boolean
    configurations: Confifurations
    manualDrawingPosible: boolean
};

export type ManualDrawingContext = {
    currentIndex: number
    previousIndex: number
    showFinalStringArt: boolean
    startManualThreading: boolean
    drawnImage: ImageData | null
    nailsCoordinates: Array<[number, number]>
    drawImageUsingCSV: boolean
};