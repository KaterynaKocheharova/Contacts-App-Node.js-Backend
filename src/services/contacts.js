import { ContactsCollection } from '../db/models/contacts.js';

export const findContacts = async () => {
  const data = await ContactsCollection.find();
  console.log(data);
  return data;
};
