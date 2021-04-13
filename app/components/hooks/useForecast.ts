import searchResult from '@/data/searchResult.json'
import forecasts from '@/data/forecast.json'
import useSWR from 'swr'

export type LocationData = typeof searchResult
export type ForecastData = typeof forecasts

export type WeatherId = number // https://en.wikipedia.org/wiki/WOEID

type UseForecast2 = (
  Array
) => {
  forecasts: null | ForecastData
  error: any
}

const useForecast: UseForecast2 = (coords) => {
  let latitude = coords[0]
  let longitude = coords[1]
  const { data: locationData, error: locationError } = useSWR<any>(
    `/api/search?lat=${latitude}&long=${longitude}`,
    {
      revalidateOnFocus: false,
    }
  )

  let targetId = locationData ? locationData[0].woeid : null

  const { data: forecastData, error: forecastError } = useSWR<
    ForecastData,
    any
  >(targetId ? `/api/woeid?id=${targetId}` : null, {
    revalidateOnFocus: false,
  })

  return {
    forecasts: forecastData,
    error: locationError,
  }
}

export default useForecast
