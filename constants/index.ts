export const headerLinks = [
  {
    label: 'Home',
    route: '/home',
  },
  {
    label: 'Add Application',
    route: '/applications/create',
  }
]

// export type ApplicationStatuses = "Not Applied" | "Applied" | "Interviewed" | "Offer" | "Rejected"

export enum ApplicationStatuses {
  NOT_APPLIED = "Not Applied",
  APPLIED = "Applied",
  INTERVIEWED = "Interviewed",
  OFFER = "Offer",
  REJECTED = "Rejected"
}

export const applicationDefaultValues = {
  title: '',
  status: ApplicationStatuses.APPLIED,
  notes: '',
  jobPostingUrl: '',
  latitude: 0,
  longitude: 0,
  isRemote: false,
  coverLetter: '',
  isFavourited: false
}
