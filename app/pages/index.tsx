import dynamic from 'next/dynamic'
import Layout from '@/components/Layout'

const WeatherApp = dynamic(() => import('@/components/Home'), {
  ssr: false,
})

const IndexPage = () => (
  <Layout title="My Weather App">
    <WeatherApp />
  </Layout>
)

export default IndexPage
