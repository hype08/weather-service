import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

export default (req: NextApiRequest, res: NextApiResponse): void => {
  res.statusCode = 200
  fetch(`https://www.metaweather.com/api/location/${req.query.targetWoeid}/`)
    .then((r) => r.json())
    .then((data) => res.json(data))
}
