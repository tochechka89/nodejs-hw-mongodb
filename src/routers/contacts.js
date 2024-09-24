import { Router } from "express";
 
import * as contactControllers from "../controllers/contacts";

import ctrlWrapper from "../utils/ctrlWrapper";

const contactsRouter = Router();

contactsRouter.get("/", ctrlWrapper(contactControllers.getAllContactsController));

contactsRouter.get("/:contactId", ctrlWrapper(contactControllers.getContactByIdController));

contactsRouter.post("/", ctrlWrapper(contactControllers.addContactController));

contactsRouter.put("/:id", ctrlWrapper(contactControllers.upsertContactController));

contactsRouter.patch("/:id", ctrlWrapper(contactControllers.patchContactController));

contactsRouter.delete("/:id", ctrlWrapper(contactControllers.deleteContactControllers));
    
export default contactsRouter;