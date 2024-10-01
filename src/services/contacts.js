import ContactCollection from "../db/models/Contact.js";

import calculatePaginationData from "../utils/calculatePaginationData.js";

import { SORT_ORDER } from "../constants/index.js";

export const getContacts = async ({ perPage, page, sortBy = "_id", sortOrder = SORT_ORDER[0],filter ={} }) => {
    const skip = (page - 1) * perPage;

     let contactQuery = ContactCollection.find();

  
  if (filter.type) {
    contactQuery = contactQuery.where('contactType').equals(filter.type);
  }
  if (filter.isFavourite) {
    contactQuery = contactQuery.where('isFavourite').equals(filter.isFavourite);
    }
    if (filter.userId) {
        contactQuery.where("userId").eq(filter.userId);
    }

    
    const data = await ContactCollection.find().skip(skip).limit(perPage).sort({[sortBy]: sortOrder});
    const count = await ContactCollection.find().merge(contactQuery).countDocuments();

    const paginationData = calculatePaginationData({ count, perPage, page });

    return {
        data,
        page,
        perPage,
        totalItems: count,
        ...paginationData,
    };
};
   

export const getContactById = id => ContactCollection.findById(id);

export const createContact = payload => ContactCollection.create(payload);

export const updateContact = async (filter, data, options = {}) => {
    const rawResult = await ContactCollection.findOneAndUpdate(filter, data, {
        new: true,
        includeResultMetadata: true,
        ...options,
    });

    if (!rawResult || !rawResult.value) return null;

    return {
        data: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};

export const deleteContact = async (filter) => {
    const result = await ContactCollection.deleteOne(filter);

    if (result.deletedCount === 0) {
        return null;
    }

    return result;
};