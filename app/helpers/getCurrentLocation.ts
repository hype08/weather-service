import { CurrentLocation } from '@/components/hooks/useForecast'

export const getCurrentLocation = () => {
  return new Promise(
    (
      resolve: (value?: CurrentLocation) => void,
      reject: (reason?: any) => void
    ) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    }
  )
}
