const parseContactFilterParams = ({ type, isFavourite }) => {
    const parsedType = type !== undefined ? type : undefined;
    const parsedIsFavourite = isFavourite !== undefined ? isFavourite : undefined;

    return {
        type: parsedType,
        isFavourite: parsedIsFavourite
    };
};

export default parseContactFilterParams;