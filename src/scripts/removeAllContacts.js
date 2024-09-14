import updateContacts from "../utils/updateContacts.js";

export const removeAllContacts = async () => {
  await updateContacts([]);
};

removeAllContacts();
