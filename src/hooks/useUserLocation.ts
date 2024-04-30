import { useState, useEffect } from 'react'
import axios from 'axios'
import { env } from '../env'

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
}

export const useUserLocation = () => {
  const [location, setLocation] = useState('No location provided')

  async function success(pos: GeolocationPosition) {
    try {
      const { latitude, longitude } = pos.coords

      if (!latitude || !longitude) {
        console.error(
          'Error fetching location: No lat or long coordinates provided',
        )
        return
      }

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${env.VITE_GOOGLE_API_KEY}`,
      )

      // GCP api will return various results with different formats, the correct one is the last but one
      const responseItemWithCorrectFormat = response.data.results.length - 2
      const formattedAddress =
        response.data.results[responseItemWithCorrectFormat].formatted_address

      setLocation(formattedAddress)
    } catch (err) {
      console.error('Error fetching location: ', err)
    }
  }

  function errors(err: GeolocationPositionError) {
    console.warn(`ERROR(${err.code}): ${err.message}`)
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then(function (result) {
          if (result.state === 'granted') {
            navigator.geolocation.getCurrentPosition(success, errors, options)
          } else if (result.state === 'prompt') {
            navigator.geolocation.getCurrentPosition(success, errors, options)
          } else if (result.state === 'denied') {
            setLocation('Rio de Janeiro, RJ')
          }
        })
    } else {
      console.log('Geolocation is not supported by this browser.')
      setLocation('Rio de Janeiro, RJ')
    }
  }, [location])
  return {
    location,
  }
}
