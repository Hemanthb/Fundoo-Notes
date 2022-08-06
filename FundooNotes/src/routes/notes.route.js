import express from 'express';
import * as notesController from '../controllers/notes.controller';
import { NotesValidator } from '../validators/notes.validator';

const router = express.Router();

//To create new note
router.post('',notesController.newNotes);

//To get all Notes 
router.get('',notesController.getAllNotes);

//To get a Note for the give id
router.get('/:_id',notesController.getANote);

//To update details of Notes
router.put('/:_id',notesController.updateNotes);

//To delete a note
router.delete('/:_id',notesController.deleteNotes);

export default router;