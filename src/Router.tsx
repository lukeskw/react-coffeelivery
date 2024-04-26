import { Routes, Route } from 'react-router-dom'
import { Homepage } from './pages/Home'
import { DefaultLayout } from './layouts/DefaultLayout'
import { Cart } from './pages/Cart'
import { Success } from './pages/Success'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order/:orderId/success" element={<Success />} />
      </Route>
    </Routes>
  )
}
