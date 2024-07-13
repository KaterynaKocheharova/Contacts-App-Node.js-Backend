import { findContacts, findContactById } from '../services/contacts.js';

export const findContactsController = async (req, res, next) => {
  try {
    const contacts = await findContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const findContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await findContactById(contactId);
    res.status(200).send({
      status: 200,
      message: `Successfully found contact with id ${contactId}`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};
