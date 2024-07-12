import { ContactsCollection } from '../db/models/contacts.js';

export const findContacts = async () => {
  const data = await ContactsCollection.find();
  return data;
};

export const findContactById = async (id) => {
  try {
    const data = await ContactsCollection.findById(id);
    return data;
  } catch(err) {
    console.log(err);
    return null;
  }
};
