import Notes from '../models/notes.model';
import { Jwt } from 'jsonwebtoken';
import { client } from '../config/redis';
import { cli } from 'winston/lib/winston/config';

//create new notes
export const newNotes = async (body) => {
    await client.del('getAllData');
    const data = await Notes.create(body);
    return data;
    
};

//Fetch all Notes
export const getNotes = async (body) => {
    const getNotesDetails = await Notes.find({userId:body.userId});
    await client.set('getAllData',JSON.stringify(getNotesDetails));
    return getNotesDetails;
};

//Retrieve a particular note by Id
export const getNote = async(id) => {
    const getNoteData = await Notes.findById(id);
    await client.set('getAData',JSON.stringify(getNoteData));
    return getNoteData;
};

//Update Note Details
export const updateNotes = async(_id,body) => {
    await client.del('getAllData');
    const updatedNoteData = await Notes.findByIdAndUpdate({
        _id
    },
    body,{new:true});
    console.log(updatedNoteData);
    return updatedNoteData;
};

//Deletes Note
export const deleteNotes = async(id) => {
    await client.del('getAllData');
    await Notes.findByIdAndDelete(id);
    return '';
};
