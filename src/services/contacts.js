import ContactCollection from "../db/models/Contact.js";

export const getAllContacts = () => ContactCollection.find();

export const getContactById = contactId => ContactCollection.findById(contactId);

export const createContact = payload => ContactCollection.create(payload);

export const updateContact = async (filter, data, options = {}) => {
    const rawResalt = await ContactCollection.findOneAndUpdate(filter, data, {
        new: true,
        includeResultMetadata: true,
        ...options,
    });

    if (!rawResalt || !rawResalt.value) return null;

    return {
        data: rawResalt.value,
        isNew: Boolean(rawResalt?.lastErrorObject?.upserted),
    };
};

export const deleteContact = filter => ContactCollection.findOneAndDelete(filter);