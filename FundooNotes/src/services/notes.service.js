import Notes from '../models/notes.model';
import { Jwt } from 'jsonwebtoken';

//create new notes
export const newNotes = async (body) => {
    const data = await Notes.create(body);
    return data;
    
};

//Fetch all Notes
export const getNotes = async (body) => {
    const getNotesDetails = await Notes.find({userId:body.userId});
    return getNotesDetails;
};

//Retrieve a particular note by Id
export const getNote = async(id) => {
    const getNoteData = await Notes.findById(id);
    return getNoteData;
};

//Update Note Details
export const updateNotes = async(_id,body) => {
    const updatedNoteData = await Notes.findByIdAndUpdate({
        _id
    },
    body,{new:true});
    return updatedNoteData;
};

//Deletes Note
export const deleteNotes = async(id) => {
    await Notes.findByIdAndDelete(id);
    return '';
};
