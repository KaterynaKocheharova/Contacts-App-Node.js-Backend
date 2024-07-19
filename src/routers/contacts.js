import { ctrlWrapper } from '../utils/ctrlWrappaer.js';
import {
  findContactsController,
  findContactByIdController,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactController
} from '../controllers/contacts.js';
import express from "express";

const router = express.Router();
const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(findContactsController));
router.get('/contacts/:contactId', ctrlWrapper(findContactByIdController));
router.post('/contacts', jsonParser, ctrlWrapper(createContactController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));
router.put('/contacts/:contactId', jsonParser, ctrlWrapper(upsertContactController));
router.patch('/contacts/:contactId', jsonParser, ctrlWrapper(patchContactController));

export default router;
