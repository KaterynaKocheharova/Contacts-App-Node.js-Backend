import { ContactsCollection } from '../db/models/contacts.js';

export const findContacts = async () => {
  const data = await ContactsCollection.find();
  return data;
};

export const findContactById = async (id) => {
  const data = await ContactsCollection.findById(id);
  return data;
};

