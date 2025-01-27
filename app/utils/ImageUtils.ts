export const createImageData = (width: number, height: number, fillValue: number): ImageData => {
    const imageData = new ImageData(width, height);
    for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] = fillValue;
        imageData.data[i + 1] = fillValue;
        imageData.data[i + 2] = fillValue;
        imageData.data[i + 3] = 255;
    }
    return imageData;
}
