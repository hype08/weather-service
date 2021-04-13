import { ForecastData } from '@/types/ForecastData'
import { LocationData } from '@/types/LocationData'
import useSWR from 'swr'

export type WeatherId = number // https://en.wikipedia.org/wiki/WOEID

type UseForecast = (
  Array
) => {
  locations: null | LocationData
  forecasts: null | ForecastData
  error: any
}

const useForecast: UseForecast = (coords) => {
  let latitude = coords[0]
  let longitude = coords[1]
  const { data: locationData, error: locationError } = useSWR<any>(
    `/api/search?lat=${latitude}&long=${longitude}`,
    {
      revalidateOnFocus: false,
    }
  )

  const { data: forecastData, error: forecastError } = useSWR<
    ForecastData,
    any
  >(locationData ? `/api/woeid?id=${locationData[0].woeid}` : null, {
    revalidateOnFocus: false,
  })

  return {
    locations: locationData,
    forecasts: forecastData,
    error: locationError,
  }
}

export default useForecast
