import { useState } from 'react'
import useForecast, { WeatherId } from '@/hooks/useForecast'

const App: React.FC = () => {
  const [weatherId, setWeatherId] = useState<WeatherId>()
  const { locations, forecasts, error } = useForecast(weatherId)

  console.log(locations) // get data to Home component.
  console.log(forecasts) // get data to Home component.

  if (error) {
    return <p>failure</p>
  }

  return <>Weather</>
}

export default App
