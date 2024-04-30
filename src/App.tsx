import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { CartsProvider } from './contexts/CartsContext'

export function App() {
  return (
    <BrowserRouter>
      <CartsProvider>
        <Router />
      </CartsProvider>
    </BrowserRouter>
  )
}

export default App
