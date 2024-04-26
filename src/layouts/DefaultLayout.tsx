import { Header } from '../components/Header'
import { Outlet } from 'react-router-dom'

export function DefaultLayout() {
  return (
    <div className="max-w-screen-lg">
      <Header />
      <Outlet />
    </div>
  )
}
