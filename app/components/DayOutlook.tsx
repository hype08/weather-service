import { ForecastData } from '@/types/ForecastData'
import { format } from 'date-fns'

type Props = {
  forecasts: ForecastData
}

const DayOutlook: React.FC<Props> = (props) => {
  return (
    <div>
      <br />
      Today's Outlook
      <br />
      Status : {props.forecasts.consolidated_weather[0].weather_state_abbr}
      <br />
      Temperature :{props.forecasts.consolidated_weather[0].the_temp.toFixed(0)}
      <br />
      timezone : {props.forecasts.timezone}
      <br />
      sunrise : {format(new Date(props.forecasts.sun_rise), 'HH:MM:SS')} AM
      <br />
      sunset : {format(new Date(props.forecasts.sun_set), 'HH:MM:SS')} PM
    </div>
  )
}

export default DayOutlook
