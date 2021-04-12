import { useState } from 'react'
import fetch from 'node-fetch'
import useForecast, { WeatherId } from '@/hooks/useForecast'
import { Searchbar } from '@/components/Searchbar'

const App: React.FC = () => {
  const [weatherId, setWeatherId] = useState<WeatherId>()
  const { locations, forecasts, error } = useForecast(weatherId)

  // console.log('🌤️', forecasts)
  // console.log('🗺️', locations)

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

  if (error) return <p>error</p>

  if (!forecasts || !locations) return <p>loading...</p>

  return (
    <div>
      <div>
        <Searchbar onHandleSelect={handleSelect} />
        {/*  5 day outlook Component*/}
        {forecasts.title} 5 day forecast
        {forecasts.consolidated_weather.map((data) => {
          return (
            <div key={data.id}>
              <br />
              date : {data.applicable_date}
              <br />
              status : {data.weather_state_name}
              <br />
              max temp : {data.max_temp.toFixed(0)}
              <br />
              min temp : {data.min_temp.toFixed(0)}
              <br />
              humidity : {data.humidity.toFixed(0)}
              <br />
              windspeed : {data.wind_speed.toFixed(0)}
              <br />
              winddirection : {data.wind_direction_compass}
              <br />
            </div>
          )
        })}
        {/* Today's outlook */}
        <br />
        Today's Outlook
        <br />
        Status : {forecasts.consolidated_weather[0].weather_state_abbr}
        <br />
        Temperature : {forecasts.consolidated_weather[0].the_temp.toFixed(0)}
        <br />
        timezone : {forecasts.timezone}
      </div>
      <br />
      {/* Maybe another component to view forecasts of nearby geo */}
      Cities Near Me
      <br />
      <div>
        {locations.slice(1).map((i) => {
          return <div>{i.title}</div>
        })}
      </div>
    </div>
  )
}

export default App
