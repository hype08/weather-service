import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

// /api/location?city=vancouver
export default (req: NextApiRequest, res: NextApiResponse): void => {
  res.statusCode = 200
  fetch(
    `https://www.metaweather.com/api/location/search/?query=${req.query.city}`
  )
    .then((r) => r.json())
    .then((data) => {
      return res.json(data)
    })
}
