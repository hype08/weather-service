import { ForecastData } from '@/types/ForecastData'
import { format } from 'date-fns'

type Props = {
  forecasts: ForecastData
}

const WeekOutlook: React.FC<Props> = ({ forecasts }) => {
  return (
    <div className="h-full w-full flex flex-col items-center lg:-ml-2 md:pt-8 mt-4">
      <div className="hidden lg:block">
        <div className="pb-5 text-2xl 2xl:hidden font-semibold">
          Today's Highlights
        </div>
      </div>
      <div className="grid lg:grid-cols-5 xs:grid-cols-2 px-2 w-full ml-12 justify-items-start md:pt-4 lg:pt-0">
        <div className="text-md text-gray-700 pt-5">
          <div className="font-medium text-md">Wind</div>
          <span className="text-gray-400">
            <span className="text-gray-500 font-bold">
              {forecasts.consolidated_weather[0].wind_speed.toFixed(0)}{' '}
            </span>
            mph {forecasts.consolidated_weather[0].wind_direction_compass}
          </span>
        </div>
        <div className="text-md text-gray-700 pt-5">
          <div className="font-medium text-md">Humidity</div>
          <span className="text-gray-500 font-bold">
            {forecasts.consolidated_weather[0].humidity.toFixed(0)}
            <span className="text-gray-400"> &#37;</span>
          </span>
        </div>
        <div className="text-md text-gray-700 pt-5">
          <div className="font-medium text-md">Visibility</div>
          <span className="text-gray-500 font-bold">
            {forecasts.consolidated_weather[0].visibility.toFixed(0)}{' '}
          </span>
          <span className="text-gray-400">miles</span>
        </div>
        <div className="text-md text-gray-700 pt-5">
          <div className="font-medium text-md">Sunrise</div>
          <span className="text-gray-400">
            {format(new Date(forecasts.sun_rise), 'HH:MM')} AM
          </span>
        </div>
        <div className="text-md text-gray-700 pt-5">
          <div className="font-medium text-md">Sunset</div>
          <span className="text-gray-400">
            {format(new Date(forecasts.sun_set), 'HH:MM')} PM
          </span>
        </div>
      </div>
    </div>
  )
}

export default WeekOutlook
