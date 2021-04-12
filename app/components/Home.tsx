import { useState, useEffect } from 'react'
import fetch from 'node-fetch'
import useForecast, { WeatherId } from '@/hooks/useForecast'
import { Searchbar } from '@/components/Searchbar'
import DayOutlook from '@/components/DayOutlook'
import WeekOutlook from '@/components/WeekOutlook'
import NearbyLocations from '@/components/NearbyLocations'

const App: React.FC = () => {
  const [weatherId, setWeatherId] = useState<WeatherId>()
  const { locations, forecasts, error } = useForecast(weatherId)

  const handleSelect = async ({ lat, lng }) => {
    // console.log(lat, lng)
    try {
      const res = await fetch(`/api/search/?lat=${lat}&long=${lng}`)
      const data = await res.json()
      setWeatherId(data[0].woeid)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  if (error) return <p>error</p>

  if (!forecasts || !locations) return <p>loading...</p>

  return (
    <div>
      <Searchbar onHandleSelect={handleSelect} />
      <DayOutlook forecasts={forecasts} />
      <WeekOutlook forecasts={forecasts} />
      <NearbyLocations locations={locations} />
      <div>
      </div>
    </div>
  )
}

export default App
