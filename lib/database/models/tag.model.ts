import { Document, Schema, model, models } from "mongoose";

export interface ITag extends Document {
  _id: string;
  name: string;
}

const TagSchema = new Schema({
  name: { type: String, required: true },
})

const Tag = models.Tag || model('Tag', TagSchema);

export default Tag;