import ContactCollection from "../db/models/Contact.js";

import calculatePaginationData from "../utils/calculatePaginationData.js";

import { SORT_ORDER } from "../constants/index.js";

export const getContacts = async ({ perPage, page, sortBy = "_id", sortOrder = SORT_ORDER[0],filter ={}, }) => {
    const skip = (page - 1) * perPage;

     let contactQuery = ContactCollection.find();

  
  if (filter.type) {
    contactQuery = contactQuery.where('contactType').equals(filter.type);
  }
  if (filter.isFavourite) {
    contactQuery = contactQuery.where('isFavourite').equals(filter.isFavourite);
    }
    if (filter.userId) {
        contactQuery = contactQuery.where("userId").equals(filter.userId);
    }

    
    const [data, count] = await Promise.all([
    contactQuery
      .skip(skip)
      .limit(perPage)
      .sort({
        [sortBy]: sortOrder
      }),
    contactQuery.clone().countDocuments() 
  ]);

  const paginationData = calculatePaginationData({
    count,
    perPage,
    page
  });

  return {
    data,
    page,
    perPage,
    totalItems: count,
    ...paginationData
  };
};
   

export const getContact = filter => ContactCollection.findById(filter);

export const createContact = payload => ContactCollection.create(payload);

export const updateContact = async (filter, data, options = {}) => {
    const updatedContact = await ContactCollection.findOneAndUpdate(filter, data, {
        upsert: options.upsert || false,
        ...options,
    });

    if (!updatedContact) return null;

    const isNew = options.upsert ? updatedContact.isNew || false : false;

    return {
        data: updatedContact,
        isNew: isNew,
    };
};

export const deleteContact = async (filter) => {
    const result = await ContactCollection.deleteOne(filter);

    if (result.deletedCount === 0) {
        return null;
    }

    return result;
};

   