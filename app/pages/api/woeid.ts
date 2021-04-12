import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

// /api/location?id=9807
export default (req: NextApiRequest, res: NextApiResponse): void => {
  res.statusCode = 200
  fetch(`https://www.metaweather.com/api/location/${req.query.id}/`)
    .then((r) => r.json())
    .then((data) => res.json(data))
}
