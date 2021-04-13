import Image from 'next/image'
import WeatherIcons from '../data/icons.json'

type Props = {
  Abbreviation: string
  width: number
  height: number
}

const Icon: React.FC<Props> = (props) => {
  const iconUrl = WeatherIcons.filter(
    (object) => object.Abbreviation === props.Abbreviation
  ).shift().Icon
  return (
    <div>
      <Image src={iconUrl} width={props.width} height={props.height} />
    </div>
  )
}

export default Icon
