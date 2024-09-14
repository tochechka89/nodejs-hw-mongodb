import { getAllContacts } from "./getAllContacts.js";

export const countContacts = async () => {
  const count = await getAllContacts();
  return count.length;
};

console.log(await countContacts());

