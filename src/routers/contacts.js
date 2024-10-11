import { Router } from "express";
 
import * as contactControllers from "../controllers/contacts.js";

import authenticate from "../middlewares/authenticate.js";
import isValidId from "../middlewares/isValidId.js";
import upload from "../middlewares/upload.js"; 

import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";

import { contactAddSchema, contactPatchSchema } from "../validation/contact.js";

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", ctrlWrapper(contactControllers.getAllContactsController));

contactsRouter.get("/:id", isValidId, ctrlWrapper(contactControllers.getContactByIdController));

contactsRouter.post("/", upload.single("photo"), validateBody(contactAddSchema), ctrlWrapper(contactControllers.addContactController));

contactsRouter.put("/:id", upload.single("photo"), isValidId, validateBody(contactAddSchema), ctrlWrapper(contactControllers.upsertContactController));

contactsRouter.patch("/:id", upload.single("photo"), isValidId, validateBody(contactPatchSchema), ctrlWrapper(contactControllers.patchContactController));

contactsRouter.delete("/:id", isValidId, ctrlWrapper(contactControllers.deleteContactController));
    
export default contactsRouter;