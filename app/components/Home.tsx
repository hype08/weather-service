import useForecast from '@/hooks/useForecast'

const App: React.FC = () => {
  const {} = useForecast()
  return <h1>App component</h1>
}

export default App
