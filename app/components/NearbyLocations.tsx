import { LocationData } from '@/hooks/useForecast'

type Props = {
  locations: LocationData
}
const NearbyLocations: React.FC<Props> = (props) => {
  return (
    <div>
      {props.locations.slice(1).map((i) => {
        return <div key={i.title}>{i.title}</div>
      })}
    </div>
  )
}

export default NearbyLocations
