import { CurrencyDollar, MapPin, Timer } from '@phosphor-icons/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { useEffect } from 'react'
export function Success() {
  const { orderId } = useParams()
  const { orders } = useCart()
  const navigate = useNavigate()

  const paymentMethod: { [key: string]: string } = {
    credit: 'Credit card',
    debit: 'Debit card',
    cash: 'Cash',
  }
  useEffect(() => {
    if (!orderId || !orders || orders === undefined) {
      navigate('/')
    }
  }, [navigate, orders, orderId])

  return (
    <main className="mx-auto my-0 flex max-w-[1160px] items-end justify-between gap-10 px-5 py-20">
      <section className="flex flex-col gap-10">
        <div className="flex flex-col gap-1">
          <h2 className="font-baloo text-4xl font-extrabold leading-snug text-yellow-600">
            BoohYah! Order confirmed!
          </h2>
          <span className="text-xl leading-snug text-stone-700">
            Now you just need to wait and your coffee will soon arrive
          </span>
        </div>

        <div className="w-full rounded-bl-3xl rounded-br-md rounded-tl-md rounded-tr-3xl border border-solid border-transparent bg-gradient-to-br from-amber-400 to-violet-600 bg-origin-border">
          <div className="flex w-full flex-col gap-8 rounded-bl-3xl rounded-br-md rounded-tl-md rounded-tr-3xl bg-zinc-50 p-10">
            <div className="flex items-center gap-3">
              <MapPin
                className="rounded-full bg-violet-600 p-2 text-white"
                size={32}
              />

              <div className="flex flex-col">
                <span>
                  Deliver on{' '}
                  <strong>
                    {orders?.order.street}, {orders?.order.number}
                  </strong>
                </span>

                <span>
                  {orders?.order.neighborhood} - {orders?.order.city},
                  {orders?.order.state}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Timer
                className="rounded-full bg-amber-400 p-2 text-white"
                size={32}
              />

              <div className="flex flex-col">
                <span>Estimate delivery</span>

                <strong>20 min - 30 min</strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CurrencyDollar
                className="rounded-full bg-yellow-600 p-2 text-white"
                size={32}
              />

              <div className="flex flex-col">
                <span>Payment on delivery</span>

                <strong>
                  {orders && paymentMethod[orders?.order.paymentMethod]}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <img
        src="/images/delivery.svg"
        alt="Pedido concluído"
        className="-mb-3"
      />
    </main>
  )
}
