import { ForecastData } from '@/types/ForecastData'
import { format } from 'date-fns'
import Icon from '@/components/Icon'

type Props = {
  forecasts: ForecastData
}

const DayOutlook: React.FC<Props> = ({ forecasts }) => {
  return (
    <div className="lg:-ml-20 h-fullbg-no-repeat relative xl:pt-6  justify-items-center grid">
      <div className="relative z-10 text-gray-500">
        <div className=" xs:grid-cols-3 gap-4">
          <div className="lg:md:my-10 lg:mb-6 ">
            <Icon
              Abbreviation={
                forecasts.consolidated_weather[0].weather_state_abbr
              }
              width={125}
              height={120}
            />
          </div>
          <div className="md:mt-1">
            <span className="font-bold text-gray-700 md:text-9xl text-3xl">
              {forecasts.consolidated_weather[0].the_temp.toFixed(0)}
            </span>
            <span className="md:text-4xl text-xl text-gray-400">&#xb0;C</span>
          </div>
          <div className="text-4xl mt-8 text-gray-600 md:mb-10 mb-2">
            {forecasts.consolidated_weather[0].weather_state_name}
          </div>
          <div className="md:text-l text-xl text-gray-500 md:mb-10">
            <div className="hidden md:block">
              <div className=" flex flex-row md:flex-col-2">
                <div className="text-xl">{forecasts.latt_long}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DayOutlook
