import dynamic from 'next/dynamic'
import Layout from '../components/Layout'

const WeatherApp = dynamic(() => import('@/components/Home'), {
  ssr: false,
})

const IndexPage = () => (
  <Layout title="Weather Boi">
    <WeatherApp />
  </Layout>
)

export default IndexPage
