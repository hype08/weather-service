import { ForecastData } from '@/hooks/useForecast'
import { format } from 'date-fns'

type Props = {
  forecasts: ForecastData
}

const WeekOutlook: React.FC<Props> = (props) => {
  return (
    <div>
      {props.forecasts.title} 5 day forecast
      {props.forecasts.consolidated_weather.slice(1).map((data) => {
        return (
          <div key={data.id}>
            <br />
            date : {format(new Date(data.applicable_date), 'MMM d')}
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
    </div>
  )
}

export default WeekOutlook
