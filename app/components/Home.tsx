import { useState, useEffect } from 'react'
import useForecast, { WeatherId } from '@/hooks/useForecast'
import { Searchbar } from '@/components/Searchbar'
import DayOutlook from '@/components/DayOutlook'
import WeekOutlook from '@/components/WeekOutlook'

const App: React.FC = () => {
  const [geo, setGeo] = useState([])
  const { forecasts, error } = useForecast(geo)

  const allowPermission = async (pos) => {
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
      setGeo([lat, lng])
    } catch (error) {
      console.log(error)
    }
  }

  if (error) return <div>error</div>
  if (!forecasts)
    return (
      <div>
        <button onClick={handlePermission}>
          Allow access to get local weather
        </button>
        <Searchbar onHandleSelect={handleSelect} />
      </div>
    )

  return (
    <>
      <div>
        <button onClick={handlePermission}>Get local weather again</button>
        <Searchbar onHandleSelect={handleSelect} />
        <DayOutlook forecasts={forecasts} />
        <WeekOutlook forecasts={forecasts} />
      </div>
    </>
  )
}

export default App
