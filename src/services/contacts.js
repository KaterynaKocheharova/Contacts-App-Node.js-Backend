import { ContactsCollection } from '../db/models/contacts.js';

export const findContacts = async () => {
  const data = await ContactsCollection.find();
  return data;
};

export const findContactById = async (id) => {
    const data = await ContactsCollection.findById(id);
    return data;
};

export const createContact = async (payload) => {
  const data = await ContactsCollection.create(payload);
  return data;
};

export const deleteContact = async (id) => {
  const data = await ContactsCollection.findOneAndDelete(id);
  return data;
};
