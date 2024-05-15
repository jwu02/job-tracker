import { ApplicationStatuses } from "@/constants";
import { Document, Schema, model, models } from "mongoose";

export interface IApplication extends Document {
  _id: string;
  title: string;
  status: ApplicationStatuses;
  notes: string;
  jobPostingUrl: string;
  latitude: number;
  longitude: number;
  isRemote: boolean;
  coverLetter: string;
  isFavourited: boolean;
  updatedAt: Date;
}

const ApplicationSchema = new Schema({
  title: { type: String, required: true },
  status: { type: String, required: true },
  notes: { type: String },
  jobPostingUrl: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  isRemote: { type: Boolean },
  coverLetter: { type: String },
  isFavourited: { type: Boolean },
  updatedAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Application = models.Application || model('Application', ApplicationSchema);

export default Application;