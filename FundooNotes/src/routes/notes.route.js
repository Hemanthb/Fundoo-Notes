import express from 'express';
import * as notesController from '../controllers/notes.controller';
import { NotesValidator } from '../validators/notes.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { redisCheck,redisGetSingle } from '../middlewares/redis.middleware';

const router = express.Router();

//To create new note
router.post('/add',userAuth,notesController.newNotes);

//To get all Notes 
router.get('',userAuth,redisCheck,notesController.getAllNotes);

//To get a Note for the give id
router.get('/:_id',userAuth,redisGetSingle,notesController.getANote);

//To update details of Notes
router.put('/:_id',userAuth,notesController.updateNotes);

//To delete a note
router.delete('/:_id',userAuth,notesController.deleteNotes);

export default router;