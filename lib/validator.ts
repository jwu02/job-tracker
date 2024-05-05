import * as z from "zod"

export const applicationFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  status: z.string(),
  notes: z.string(),
  jobPostingUrl: z.string().url(),
  latitude: z.number(),
  longitude: z.number(),
  coverLetter: z.string()
  // tags
})
