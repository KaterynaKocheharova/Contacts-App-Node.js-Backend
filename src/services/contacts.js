import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getContacts = async ({
  page,
  perPage,
  sortOrder,
  sortBy,
  filter,
  userId,
}) => {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const query = {
    userId: userId,
  };

  const contactsQuery = ContactsCollection.find(query);

  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(Boolean(filter.isFavorite));
  }

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.countDocuments(query),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, page, perPage);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  const data = await ContactsCollection.findOne({
    _id: contactId,
    userId,
  });
  return data;
};

export const createContact = async (newContact) => {
  const data = await ContactsCollection.create(newContact);
  return data;
};

export const deleteContact = async (contactId, userId) =>
  ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });

export const upsertContact = async (id, userId, payload, options = {}) => {
  const rawData = await ContactsCollection.findOneAndUpdate(
    { _id: id, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawData.value) {
    return null;
  }

  return {
    contact: rawData.value,
    isNew: rawData?.lastErrorObject?.upserted,
  };
};
