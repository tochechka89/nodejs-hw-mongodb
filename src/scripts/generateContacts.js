import { createFakeContact } from '../utils/createFakeContact.js';
import updateContacts from '../utils/updateContacts.js';
import { getAllContacts } from "./getAllContacts.js";

const generateContacts = async (number) => {
  const contactList = await getAllContacts();
  const newContactList = Array(number).fill(0).map(createFakeContact);
  contactList.push(...newContactList);
  await updateContacts(contactList);
};

generateContacts(5);
