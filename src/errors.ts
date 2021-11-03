interface Error {
    e: string;
    message: string;
}

export const caseCountOutOfRangeError = (): Error => ({
    e: 'CaseCountOutOfRange',
    message: 'Test case count out of range'
});

export const dimensionOutOfRangeError = (): Error => ({
    e: 'DimensionsOutOfRange',
    message: 'Bitmap dimensions out of range'
});

export const whitePixelNotFoundError = (): Error => ({
    e: 'WhitePixelNotFound',
    message: 'White pixel not found'
});
