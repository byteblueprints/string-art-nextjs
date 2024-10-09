import { Storage } from "../algorithm/Storage";
import { CurrentStatus } from "./enum/CurrentStatus";

export type LinePreCalculatingWorkerMsg = {
    xc: number;
    yc: number;
    r: number;
    nailCount: number;
};

export type LinePreCalculatingWorkerResponse = {
    message: string;
    count: number
    status: CurrentStatus
};

export type StringArtWorkerMsg = {
    allLineCoordinates:  { [key: string]: Array<[number, number]>; }; 
    imageData: ImageData;            
    maxLineCount: number;          
    height: number;                  
    width: number;                   
    nailsCordinates: [number, number][];     
    outputScalingFactor: number;   
    stringWeight: number;            
    skip: number
};

export type StringArtWorkerResponse = {
    message: string;
    imageData: ImageData;
    status: CurrentStatus;
    count: number
};