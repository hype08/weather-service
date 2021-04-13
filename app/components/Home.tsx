import { useState } from 'react'
import Link from 'next/link'
import useForecast from '@/hooks/useForecast'
import { Searchbar } from '@/components/Searchbar'
import DayOutlook from '@/components/DayOutlook'
import WeekOutlook from '@/components/WeekOutlook'
import Highlights from '@/components/Highlights'

const App: React.FC = () => {
  const [geo, setGeo] = useState([37.39999, -122.079552]) // Cupertino, CA
  const { forecasts, error } = useForecast(geo)

  const allowPermission = async (pos: GeolocationPosition) => {
    const { longitude, latitude } = pos.coords
    setGeo([latitude, longitude])
  }

  const handlePermission = () => {
    navigator.permissions
      .query({ name: 'geolocation' })
      .then(function (result) {
        if (result.state == 'prompt' || 'granted') {
          navigator.geolocation.getCurrentPosition(allowPermission)
        }
      })
  }

  const handleSelect = async ({ lat, lng }) => {
    try {
      const res = await fetch(`/api/search/?lat=${lat}&long=${lng}`)
      const data = await res.json()
      const geoArray = data[0].latt_long.split(',')
      setGeo([parseFloat(geoArray[0]), parseFloat(geoArray[1])])
    } catch (error) {
      console.log('😱 Error: ', error)
    }
  }

  if (error)
    return (
      <div className=" text-3xl font-light text-center pt-20 h-screen">
        There was an error
      </div>
    )

  if (!forecasts)
    return (
      <div className=" text-3xl font-light text-center pt-20 h-screen">
        Getting forecast ..
      </div>
    )

  return (
    <>
      <nav id="header" className="w-full z-30 top-0 py-4">
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-2 ">
          <div className="pl-4 text-2xl flex items-center ">
            <Link href="/">
              <a>{forecasts.title}</a>
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mt-1 mx-2 mb-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div className="block sm:hidden pr-4">
            <button
              onClick={handlePermission}
              className="p-2 mx-auto p-auto lg:mx-0 hover:underline gradient2 text-gray-800 font-extrabold rounded shadow hover:shadow-lg hover:border-transparent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>

          <div
            className="w-full sm:flex sm:items-center sm:w-auto hidden mt-2 lg:mt-0 text-black p-4 lg:p-0 z-20 -ml-20"
            id="nav-content"
          >
            <ul className="list-reset sm:flex justify-end flex-1 items-center">
              <li className="">
                <Searchbar onHandleSelect={handleSelect} />
              </li>
              <li className="px-4">
                <button
                  onClick={handlePermission}
                  className="p-2 lg:mx-0 hover:underline gradient2 text-gray-800 font-extrabold rounded shadow hover:shadow-lg hover:border-transparent"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section className="container mx-auto flex flex-wrap">
        <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
          <DayOutlook forecasts={forecasts} />
        </div>

        <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
          <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden">
            <div className="flex items-center justify-center pb-2">
              <WeekOutlook forecasts={forecasts} />
            </div>
            <div className="flex items-center justify-center pb-10">
              <Highlights forecasts={forecasts} />
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full h-6 flex justify-center item-center mt-3 mb-10">
        <div className="border-t text-center pt-5">By Henry</div>
      </footer>
    </>
  )
}
export default App
