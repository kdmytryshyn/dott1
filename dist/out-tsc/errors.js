//other solution includes enum ErrorCode
//do they enum this interface so that they can keep track of the dif errors?
//could i implement this like the constraints? why is each exported separately?
//idk if it can just have Exception interface being called here
//what actually are these... are they functions? can i group them in a class maybe?
//why is the syntax of these functions so weird
export const caseCountOutOfRangeError = () => ({
    e: 'CaseCountOutOfRange',
    message: 'Test case count out of range'
});
export const dimensionOutOfRangeError = () => ({
    e: 'DimensionsOutOfRange',
    message: 'Bitmap dimensions out of range'
});
export const whitePixelNotFoundError = () => ({
    e: 'WhitePixelNotFound',
    message: 'White pixel not found'
});
//# sourceMappingURL=errors.js.map