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
};