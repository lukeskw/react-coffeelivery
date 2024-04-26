import { Routes, Route } from 'react-router-dom'
import { Homepage } from './pages/Home'
import { DefaultLayout } from './layouts/DefaultLayout'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Homepage />} />
      </Route>
    </Routes>
  )
}
