import useSWR from 'swr'
import { getCurrentLocation } from '@/helpers/getCurrentLocation'

export type CurrentLocation = {
  coords: {
    latitude: number
    longitude: number
  }
}

export type WeatherId = number // https://en.wikipedia.org/wiki/WOEID
type LocationData = Object
type ForecastData = Object

type UseForecast = (
  weatherId?: WeatherId
) => {
  locations: null | LocationData
  forecasts: null | ForecastData
  error: any
}

const useForecast: UseForecast = (weatherId) => {
  // Try to get location(s)
  const { data: currentLocation, error: currentLocationError } = useSWR<
    CurrentLocation,
    any
  >('test', getCurrentLocation, {
    // Don't reval on window focus
    revalidateOnFocus: false,
  })

  const { data: locationData, error: locationError } = useSWR<LocationData, any>(
    currentLocation
      ? `/api/search?lat=${currentLocation.coords.latitude}&long=${currentLocation.coords.longitude}`
      : null,
    {
      // Don't reval on window focus
      revalidateOnFocus: false,
    }
  )

  let targetId: WeatherId
  if (weatherId) {
    targetId = weatherId
  } else {
    targetId = locationData ? locationData[0].woeid : null
  }

  const { data: forecastData, error: forecastError } = useSWR<ForecastData, any>(
  targetId ? `/api/location?targetWoeid=${targetId}` : null, {
    revalidateOnFocus: false,
  })

  return {
    locations: locationData,
    forecasts: forecastData,
    error: locationError,
  }
}

export default useForecast
