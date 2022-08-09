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
    },
    userId: {
        type: String
    }

  },
  {
    timestamps: true
  }
);

export default model('Notes', noteSchema);
