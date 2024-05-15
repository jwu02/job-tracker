"use client"

import { IApplication } from '@/lib/database/models/application.model'
import { APIProvider, AdvancedMarker, Map } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import ApplicationCard from './ApplicationCard';
import ApplicationsList from './ApplicationsList';

type ApplicationsMapProps = {
  userId: string,
  data: IApplication[]
}

const ApplicationsMap = ({ 
  userId,
  data 
}:ApplicationsMapProps) => {
  const defaultPos = {lat: 0, lng: 0}
  const [clientPos, setClientPos] = useState(defaultPos)

  // https://stackoverflow.com/questions/63536562/reference-errornavigator-not-defined-with-nextjs
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

  const [selectedApplication, setSelectedApplication] = useState<IApplication|undefined>()

  let filteredData = data.filter((a) => a._id === selectedApplication?._id)

  return (
    <div className="flex-1 w-full h-[70vh] relative">
      <ApplicationsList 
        userId={userId}
        data={selectedApplication ? filteredData : data} 
        setSelectedApplication={setSelectedApplication} 
      />

      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <Map
          mapId={'bf51a910020fa25a'}
          defaultCenter={clientPos}
          defaultZoom={7}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        >
          {
            data.map((a) => {
              return a.latitude && a.longitude ? (
                <AdvancedMarker 
                  key={a._id}
                  position={{ lat: a.latitude, lng: a.longitude }} 
                  onClick={() => {
                    setSelectedApplication(a)
                  }}
                />
              ) : null;
            })
          }
        </Map>
      </APIProvider>
    </div>
  )
}

export default ApplicationsMap