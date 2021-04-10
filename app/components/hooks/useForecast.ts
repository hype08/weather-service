import useSWR from 'swr'
import { getCurrentLocation } from '@/helpers/getCurrentLocation'

export type CurrentLocation = {
  coords: {
    latitude: number
    longitude: number
  }
}

const useForecast = () => {
  // Try to get location
  const { data: currentLocation, error: currentLocationError } = useSWR<
    CurrentLocation,
    any
  >('test', getCurrentLocation, {
    // Don't reval on window focus
    revalidateOnFocus: false,
  })

  // Maybe get locations close by

  return {}
}

export default useForecast
