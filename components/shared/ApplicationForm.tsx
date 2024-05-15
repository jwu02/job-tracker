"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { applicationFormSchema } from "@/lib/validator"
import * as z from 'zod'
import { ApplicationStatuses, applicationDefaultValues } from "@/constants"
import { Textarea } from "@/components/ui/textarea"
import React, { ChangeEvent, useEffect, useState } from "react"

import { useRouter } from "next/navigation"
import { createApplication, updateApplication } from "@/lib/actions/application.actions"
import { IApplication } from "@/lib/database/models/application.model"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { APIProvider, Map, MapMouseEvent, Marker } from '@vis.gl/react-google-maps';
import { Checkbox } from "../ui/checkbox"

type ApplicationFormProps = {
  userId: string
  type: "Create" | "Update"
  // last two props used for the update form
  application?: IApplication
  applicationId?: string
}

const ApplicationForm = ({ userId, type, application, applicationId }: ApplicationFormProps) => {
  const initialValues = application && type === 'Update' 
    ? { 
      ...application, 
    }
    : applicationDefaultValues;
  const router = useRouter();

  const form = useForm<z.infer<typeof applicationFormSchema>>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: initialValues
  })
 
  async function onSubmit(values: z.infer<typeof applicationFormSchema>) {

    if(type === 'Create') {
      try {
        const newApplication = await createApplication({
          userId,
          application: { 
            ...values, 
            latitude: markerPos.lat, 
            longitude: markerPos.lng,
          },
          path: '/home'
        })

        if(newApplication) {
          form.reset();
          router.push(`/applications/${newApplication._id}`)
        }
      } catch (error) {
        console.log(error);
      }
    }

    if(type === 'Update') {
      if(!applicationId) {
        router.back()
        return;
      }

      try {
        const updatedApplication = await updateApplication({
          userId,
          application: { ...values, _id: applicationId },
          path: `/applications/${applicationId}`
        })

        if(updatedApplication) {
          form.reset();
          router.push(`/applications/${updatedApplication._id}`)
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const defaultPos = {lat: 0, lng: 0}
  const [clientPos, setClientPos] = useState(defaultPos)
  // for users to mark the work location
  const [markerPos, setMarkerPos] = useState(defaultPos)

  useEffect(()=>{
    // HTML5 geolocation marker initialization
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const userPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          setClientPos(userPosition);
        }
      );
    }
  },[])

  const onMapClick = (e: MapMouseEvent) => {
    console.log(e)
    setMarkerPos({
      lat: e.detail.latLng!.lat,
      lng: e.detail.latLng!.lng
    })
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex gap-5">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="w-full">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="select-field">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                  </FormControl>
                  <FormMessage />

                  <SelectContent>
                    {(Object.keys(ApplicationStatuses) as Array<keyof typeof ApplicationStatuses>).map((key) => (
                      <SelectItem 
                        key={key} 
                        value={ApplicationStatuses[key]} 
                        className="select-item p-regular-14"
                      >
                        {ApplicationStatuses[key]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Job Title" {...field} className="input-field" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="jobPostingUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Job Posting URL" {...field} className="input-field" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="isRemote"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center">
                    <label htmlFor="isRemote" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Remote Work Location</label>
                    <Checkbox
                      onCheckedChange={field.onChange}
                      checked={field.value}
                    id="isRemote" className="mr-2 h-5 w-5 border-2 border-primary-500" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
          
        <div className="flex flex-col gap-5">
          <p>Click anywhere on the map below to mark the work location</p>

          <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
            <Map
              style={{width: '100%', height: '50vh'}}
              defaultCenter={clientPos}
              defaultZoom={10}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
              onClick={onMapClick}
            >
              {
                markerPos && 
                <Marker position={markerPos} />
              }
            </Map>
          </APIProvider>
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea placeholder="Notes" {...field} className="textarea rounded-2xl" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverLetter"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea placeholder="Cover Letter" {...field} className="textarea rounded-2xl" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button 
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? (
            'Submitting...'
          ): `${type} Application`}
        </Button>
      </form>
    </Form>
  )
}

export default ApplicationForm