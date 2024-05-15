import * as z from "zod"
import { ApplicationStatuses } from "@/constants"

export const applicationFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  status: z.nativeEnum(ApplicationStatuses),
  notes: z.string(),
  jobPostingUrl: z.string().url(),
  latitude: z.number(),
  longitude: z.number(),
  isRemote: z.boolean(),
  coverLetter: z.string(),
  isFavourited: z.boolean()
  // tags
})
