import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'
import useOnclickOutside from 'react-cool-onclickoutside'

export type SelectProps = {
  lat: number
  lng: number
}

type Props = {
  onHandleSelect: (props: SelectProps) => void
}

// This was taken and modified from use-places-autocomplete github example (see README acknowledgements)
export const Searchbar: React.FC<Props> = ({ onHandleSelect }: Props) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  })
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions()
  })

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value)
  }

  const handleSelect = ({ description }) => async () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false)
    clearSuggestions()

    try {
      const results = await getGeocode({ address: description })
      const { lat, lng } = await getLatLng(results[0])

      onHandleSelect({ lat, lng })
    } catch (err) {
      console.log('😱 Error: ', err)
    }
  }

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion

      return (
        <li
          className="bg-white"
          key={place_id}
          onClick={handleSelect(suggestion)}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      )
    })

  return (
    <div className="z-50">
      <div ref={ref}>
        <input
          className="bg-gray-100 w-full rounded-0 shadow-lg p-3"
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Enter a location .."
        />

        {status === 'OK' && (
          <ul className="absolute mt-2 mr-20 w-md bg-white px-4 pt-3 pb-20 shadow-xl">
            {renderSuggestions()}
          </ul>
        )}
      </div>
    </div>
  )
}
