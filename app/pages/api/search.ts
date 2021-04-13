import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

export default function geoHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { lat, long },
    method,
  } = req

  switch (method) {
    case 'GET':
      const data = fetch(
        `https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}`
      )
        .then((r) => r.json())
        .then((data) => res.status(200).json(data))
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
