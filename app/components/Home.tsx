import { useState } from 'react'
import fetch from 'node-fetch'
import useForecast, { WeatherId } from '@/hooks/useForecast'
import { PlacesAutocomplete } from '@/components/PlacesAutocomplete'

const App: React.FC = () => {
  const [weatherId, setWeatherId] = useState<WeatherId>()
  const { locations, forecasts, error } = useForecast(weatherId)

  console.log(locations) // get data to Home component.
  console.log(forecasts) // get data to Home component.

  const handleSelect = async ({ lat, lng }) => {
    console.log(lat, lng)
    try {
      const res = await fetch(`/api/search/?lat=${lat}&long=${lng}`)
      const data = await res.json()
      setWeatherId(data[0].woeid)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  if (error) {
    return <p>failure</p>
  }
  return (
    <>
      <PlacesAutocomplete onHandleSelect={handleSelect} />
    </>
  )
}

export default App
