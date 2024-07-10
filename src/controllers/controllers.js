import { findContacts, findContactById } from "../services/contacts.js";

export const setUpControllers = (app) => {

 //  ROUTE GET CONTACTS

 app.get('/contacts', async (req, res) => {
    const contacts = await findContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts',
      data: contacts,
    });
  });

  // =================== ROUTE GET CONTACT BY ID

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contact = await findContactById(contactId);

    if (!contact) {
      res.status(404).json({
        message: 'No contact with such id found',
      });
      return;
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}`,
      data: contact,
    });
  });

    // ================= PROCESSING NON-EXISTING PATHS

    app.get('*', (req, res) => {
        res.status(404).json({
          message: 'Not found page!',
        });
      });
};
