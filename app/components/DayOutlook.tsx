import { ForecastData } from '@/components/hooks/useForecast'
import { format } from 'date-fns'

type Props = {
  forecasts: ForecastData
}

const DayOutlook: React.FC<Props> = ({ forecasts }) => {
  return (
    <div>
      <br />
      Today's Outlook
      <br />
      {forecasts.consolidated_weather[0].weather_state_abbr}
      <br />
      {forecasts.title}
      <br />
      {forecasts.consolidated_weather[0].the_temp.toFixed(0)}
      timezone : {forecasts.timezone}
      <br />
      sunrise : {format(new Date(forecasts.sun_rise), 'HH:MM:SS')} AM
      <br />
      sunset : {format(new Date(forecasts.sun_set), 'HH:MM:SS')} PM
    </div>
  )
}

export default DayOutlook
