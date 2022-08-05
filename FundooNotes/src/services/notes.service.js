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
}