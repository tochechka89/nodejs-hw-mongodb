import * as fs from "node:fs/promises";
import {
  PATH_DB
} from '../constants/contacts.js';

const updateContacts = async (contacts) => {
  await fs.writeFile(PATH_DB, JSON.stringify(contacts, '', 2));
};

export default updateContacts;