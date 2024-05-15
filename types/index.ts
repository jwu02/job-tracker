import { ApplicationStatuses } from "@/constants"

// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string
  email: string
  photo: string
}

export type UpdateUserParams = {
  photo: string
}

// ====== EVENT PARAMS
export type CreateApplicationParams = {
  userId: string
  application: {
    title: string
    status: ApplicationStatuses
    notes: string
    jobPostingUrl: string
    latitude: number
    longitude: number
    isRemote: boolean
    coverLetter: string
    isFavourited: boolean
  }
  path: string
}

export type UpdateApplicationParams = {
  userId: string
  application: {
    _id: string
    title: string
    status: ApplicationStatuses
    notes: string
    jobPostingUrl: string
    latitude: number
    longitude: number
    isRemote: boolean
    coverLetter: string
    isFavourited: boolean
  }
  path: string
}

export type DeleteApplicationParams = {
  applicationId: string
  path: string
}

export type GetApplicationsByUserParams = {
  userId: string
}

export type Application = {
  _id: string
  title: string
  status: ApplicationStatuses
  notes: string
  jobPostingUrl: string
  latitude: number
  longitude: number
  isRemote: boolean
  coverLetter: string
  isFavourited: boolean
  user: {
    _id: string
  }
}

export type SearchParamProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
