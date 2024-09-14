import {
  getAllContacts
}
from "./getAllContacts.js";
import updateContacts from '../utils/updateContacts.js';

export const removeLastContact = async () => {
  const contactList = await getAllContacts();
  contactList.pop();
  await updateContacts(contactList);
};

removeLastContact();