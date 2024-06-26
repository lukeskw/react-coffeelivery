import { Link } from 'react-router-dom'
import { MapPin, ShoppingCart } from '@phosphor-icons/react'
import { useUserLocation } from '../hooks/useUserLocation'
import { useCart } from '../hooks/useCart'

export function Header() {
  const { carts } = useCart()
  const { location } = useUserLocation()

  return (
    <header className="mx-auto my-0 flex max-w-[1160px] items-center justify-between px-5 py-8">
      <Link to="/">
        <img src="/logo.svg" alt="Coffee Delivery" className="" />
      </Link>

      <aside className="flex gap-3">
        <div className="flex items-center gap-1 rounded-md bg-violet-100 px-2 py-2.5">
          <MapPin size={22} weight="fill" className="text-violet-600" />
          <span className="text-violet-900">{location}</span>
        </div>

        <Link
          to={`cart`}
          aria-disabled={carts.length === 0}
          className="relative flex items-center rounded-md bg-amber-100 p-2 text-yellow-600 aria-disabled:pointer-events-none"
        >
          <ShoppingCart size={22} weight="fill" />
          {carts.length > 0 ? (
            <span className="absolute right-0 top-0 flex size-5 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-yellow-600 font-baloo text-sm font-bold text-white ">
              {carts.length}
            </span>
          ) : null}
        </Link>
      </aside>
    </header>
  )
}
