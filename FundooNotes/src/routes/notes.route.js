import express from 'express';
import * as notesController from '../controllers/notes.controller';
import { NotesValidator } from '../validators/notes.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//To create new notes
router.post('',notesController.newNotes);

//To get all Notes 
router.get('',notesController.getAllNotes);

export default router;