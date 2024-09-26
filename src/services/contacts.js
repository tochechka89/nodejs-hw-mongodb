import ContactCollection from "../db/models/Contact.js";

export const getAllContacts = () => ContactCollection.find();

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