import Joi from "joi";

import { enumList } from "../constants/contact.js";

export const contactAddSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.string().min(3).max(20).required(),
    email: Joi.string().min(3).max(20).email(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid(...enumList).required(),
});

export const contactPatchSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    phoneNumber: Joi.string().min(3).max(20),
    email: Joi.string().min(3).max(20),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid(...enumList),
});