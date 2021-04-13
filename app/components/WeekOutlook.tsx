import { ForecastData } from '@/types/ForecastData'
import { format } from 'date-fns'
import Card from '@/components/Card'
import Icon from './Icon'

type Props = {
  forecasts: ForecastData
}

const WeekOutlook: React.FC<Props> = ({ forecasts }) => {
  return (
    <div className="h-full lg:pt-10 flex flex-col items-center lg:-ml-2">
      <div className="flex flex-1">
        <div className="max-w-3xl">
          <div className="hidden lg:block">
            <div className="text-2xl sm:text-md font-semibold justify-items-center grid">
              This Week's Forecast
            </div>
          </div>
          <div className="grid lg:grid-cols-5 grid-cols-2 gap-2">
            {forecasts.consolidated_weather.slice(1).map((data) => {
              return (
                <Card
                  key={data.id}
                  title={format(new Date(data.applicable_date), 'E d')}
                >
                  <Icon
                    Abbreviation={data.weather_state_abbr}
                    width={42}
                    height={40}
                  />
                  <div className="w-full flex font-bold justify-around p-3 text-gray-700 text-sm">
                    {data.max_temp.toFixed(0)}
                    <span className="pr-3">&#xb0;C</span>
                    <div className="hidden sm:block">
                      <div className="text-sm text-gray-400">
                        {data.min_temp.toFixed(0)}
                        <span>&#xb0;C</span>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeekOutlook
