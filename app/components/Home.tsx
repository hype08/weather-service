import { useState } from 'react'
import useForecast, { WeatherId } from '@/hooks/useForecast'
import { Searchbar } from '@/components/Searchbar'
import DayOutlook from '@/components/DayOutlook'
import WeekOutlook from '@/components/WeekOutlook'

const App: React.FC = () => {
  const [geo, setGeo] = useState([37.39999, -122.079552]) // Default is Cupertino, CA
  const { forecasts, error } = useForecast(geo)

  const allowPermission = async (pos: GeolocationPosition) => {
    const { longitude, latitude } = pos.coords
    setGeo([latitude, longitude])
  }

  const handlePermission = () => {
    navigator.permissions
      .query({ name: 'geolocation' })
      .then(function (result) {
        if (result.state == 'prompt' || 'granted') {
          navigator.geolocation.getCurrentPosition(allowPermission)
        }
      })
  }

  const handleSelect = async ({ lat, lng }) => {
    try {
      const res = await fetch(`/api/search/?lat=${lat}&long=${lng}`)
      const data = await res.json()
      const geoArray = data[0].latt_long.split(',')
      setGeo([parseFloat(geoArray[0]), parseFloat(geoArray[1])])
    } catch (error) {
      console.log('😱 Error: ', error)
    }
  }

  if (error) return <div>error</div>

  if (!forecasts)
    return (
      <div>
        <button onClick={handlePermission}>Get Local Weather</button>
        <Searchbar onHandleSelect={handleSelect} />
      </div>
    )

  return (
    <div>
      <button onClick={handlePermission}>Get local weather</button>
      <Searchbar onHandleSelect={handleSelect} />
      <DayOutlook forecasts={forecasts} />
      <WeekOutlook forecasts={forecasts} />
    </div>
  )
}

export default App
