import { findContacts, findContactById } from "../services/contacts.js";
import { ContactsCollection } from "../db/models/contacts.js";

export const setUpControllers = (app) => {

 app.get('/contacts', async (req, res) => {
    const contacts = await findContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const { contactId } = req.params;
      const contact = await ContactsCollection.findById(contactId);
      // const contact = await findContactById(contactId);

      if (contact === null) {
        return res.status(404).send({
          message: 'No contact with such id found',
        });
      }

      res.status(200).send({
        status: 200,
        message: `Successfully found contact with id ${contactId}`,
        data: contact,
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: 'An error occurred while retrieving the contact',
        error: error.message,
      });
    }
  });
};
