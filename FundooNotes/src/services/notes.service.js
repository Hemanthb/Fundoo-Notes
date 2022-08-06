import Notes from '../models/notes.model';

//create new notes
export const newNotes = async (body) => {
    const existingNotes = await Notes.findOne({Title:body.Title});
    if(existingNotes){
        throw new Error("Notes with same Title exists already!");
    }
    else{
        const data = await Notes.create(body);
        return data;
    }
};

//Fetch all Notes
export const getNotes = (body) => {
    const getNotesDetails = Notes.find(function(err,docs){});
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
