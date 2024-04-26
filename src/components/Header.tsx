import { Link } from 'react-router-dom'
import { MapPin, ShoppingCart } from '@phosphor-icons/react'

export function Header() {
  const cart = ['0', '1']
  return (
    <header className="mx-auto my-0 flex max-w-[1160px] items-center justify-between px-5 py-8">
      <Link to="/">
        <img src="/logo.svg" alt="Coffee Delivery" className="" />
      </Link>

      <aside className="flex gap-3">
        <div className="flex items-center gap-1 rounded-md bg-violet-100 px-2 py-2.5">
          <MapPin size={22} weight="fill" className="text-violet-600" />
          <span className="text-violet-900">Porto Alegre, RS</span>
        </div>

        <Link
          to={`cart`}
          aria-disabled={cart.length === 0}
          className="relative flex items-center rounded-md bg-amber-100 p-2 text-yellow-600 "
        >
          <ShoppingCart size={22} weight="fill" />
          {cart.length > 0 ? (
            <span className="absolute right-0 top-0 flex size-5 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-yellow-600 font-baloo text-sm font-bold text-white ">
              {cart.length}
            </span>
          ) : null}
        </Link>
      </aside>
    </header>
  )
}
