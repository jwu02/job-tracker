import { Document, Schema, model, models } from "mongoose";

export interface IApplication extends Document {
  _id: string;
  title: string;
  status: string;
  notes?: string;
  jobPostingUrl?: string;
  latitude?: number;
  longitude?: number;
  coverLetter?: string;
  updatedAt: Date;
  user: { _id: string }
}

const ApplicationSchema = new Schema({
  title: { type: String, required: true },
  status: { type: String, required: true },
  notes: { type: String },
  jobPostingUrl: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  coverLetter: { type: String },
  updatedAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Application = models.Application || model('Application', ApplicationSchema);

export default Application;