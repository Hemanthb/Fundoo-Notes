import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
  {
    Title: {
      type: String
    },
    Description: {
      type: String
    },
    Colour: {
      type: String
    },
    IsArchived: {
        type: Boolean
    },
    IsTrashed: {
        type: Boolean
    }

  },
  {
    timestamps: true
  }
);

export default model('Notes', noteSchema);
