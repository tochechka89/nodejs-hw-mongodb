import { SORT_ORDER } from "../constants/index.js";

const parseSortParams = ({ sortBy, sortFields, sortOrder }) => {
    const parseSortBy = sortFields.includes(sortBy) ? sortBy : "_id";
    const parsedSortOrder = SORT_ORDER.includes(sortOrder) ? sortOrder : SORT_ORDER[0];

    return {
        sortBy: parseSortBy,
        sortOrder: parsedSortOrder,
    };
};

export default parseSortParams;