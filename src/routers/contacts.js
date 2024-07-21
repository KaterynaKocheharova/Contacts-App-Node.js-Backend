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
import { validateBody } from '../middlewares/validateBody.js';
import { contactsValidationSchema } from '../validation/contacts.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(findContactsController));
router.get('/:contactId', ctrlWrapper(findContactByIdController));
router.post('/', jsonParser, validateBody(contactsValidationSchema), ctrlWrapper(createContactController));
router.delete('/:contactId', ctrlWrapper(deleteContactController));
router.put('/:contactId', jsonParser, ctrlWrapper(upsertContactController));
router.patch('/:contactId', jsonParser, ctrlWrapper(patchContactController));

export default router;
