'use server'

import { revalidatePath } from 'next/cache'

import { connectToDatabase } from '@/lib/database'
import Application from '@/lib/database/models/application.model'
import User from '@/lib/database/models/user.model'
import { handleError } from '@/lib/utils'

import {
  CreateApplicationParams,
  UpdateApplicationParams,
  DeleteApplicationParams,
  GetApplicationsByUserParams,
} from '@/types'
import mongoose from 'mongoose'

const populateApplication = (query: any) => {
  return query.populate({ path: 'user', model: User, select: '_id' })
}

// CREATE
export async function createApplication({ userId, application, path }: CreateApplicationParams) {
  try {
    await connectToDatabase()

    // TODO: find a way of obtaining the DB userId user._id from auth() later
    const user = await User.findById(userId)
    if (!user) throw new Error('User not found')

    const newApplication = await Application.create({ ...application, user: user })

    revalidatePath(path)

    return JSON.parse(JSON.stringify(newApplication))
  } catch (error) {
    handleError(error)
  }
}

// GET ONE APPLICATION BY ID
export async function getApplicationById(applicationId: string) {
  try {
    await connectToDatabase()

    const application = await populateApplication(Application.findById(applicationId))

    if (!application) throw new Error('Application not found')

    return JSON.parse(JSON.stringify(application))
  } catch (error) {
    handleError(error)
  }
}

// UPDATE
export async function updateApplication({ userId, application, path }: UpdateApplicationParams) {
  try {
    await connectToDatabase()

    const applicationToUpdate = await Application.findById(application._id)
    if (!applicationToUpdate || applicationToUpdate.user.toHexString() !== userId) {
      throw new Error('Unauthorized or application not found')
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      application._id,
      application,
      { new: true }
    )
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedApplication))
  } catch (error) {
    handleError(error)
  }
}

// DELETE
export async function deleteApplication({ applicationId, path }: DeleteApplicationParams) {
  try {
    await connectToDatabase()

    const deletedApplication = await Application.findByIdAndDelete(applicationId)
    if (deletedApplication) revalidatePath(path)
  } catch (error) {
    handleError(error)
  }
}

// GET APPLICATIONS BY USER
export async function getApplicationsByUser({ userId }: GetApplicationsByUserParams) {
  try {
    await connectToDatabase()

    const conditions = { user: new mongoose.Types.ObjectId(userId) }
    
    const applicationsQuery = await Application.find(conditions)
      .sort({ updatedAt: 'desc' })
    
    return { data: JSON.parse(JSON.stringify(applicationsQuery)) }
  } catch (error) {
    handleError(error)
  }
}

export async function favouriteApplication({ userId, application, path }: UpdateApplicationParams) {
  try {
    // const applicationToUpdate = {
    //   ...application,
    //   isFavourited: !application.isFavourited
    // }
    application.isFavourited = !application.isFavourited

    const updatedApplication = await updateApplication({ userId, application, path })
    
    return JSON.parse(JSON.stringify(updatedApplication))
  } catch (error) {
    handleError(error)
  }
}
