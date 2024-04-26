import { Coffee, Package, ShoppingCart, Timer } from '@phosphor-icons/react'
import { coffees } from '../../data.json'
import { Card } from '../components/Card'

export function Homepage() {
  return (
    <main>
      <section className="relative">
        <div className="mx-auto my-0 flex max-w-[1160px] items-start justify-center gap-14 px-5 py-24">
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-4">
              <h1 className="font-baloo text-5xl text-stone-800">
                Encontre o café perfeito para qualquer hora do dia
              </h1>

              <span>
                Com o Coffee Delivery você recebe seu café onde estiver, a
                qualquer hora
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-1 gap-y-5">
              <div className="flex items-center gap-3">
                <ShoppingCart
                  weight="fill"
                  size={32}
                  className="rounded-full bg-yellow-600 p-2 text-sm text-slate-50"
                />
                <span>Compra simples e segura</span>
              </div>

              <div className="flex items-center gap-3">
                <Package
                  size={34}
                  weight="fill"
                  className="rounded-full bg-slate-800 p-2 text-slate-50"
                />
                <span>Embalagem mantém o café intacto</span>
              </div>

              <div className="flex items-center gap-3">
                <Timer
                  size={32}
                  weight="fill"
                  className="rounded-full bg-amber-400 p-2 text-slate-50"
                />
                <span>Entrega rápida e rastreada</span>
              </div>

              <div className="flex items-center gap-3">
                <Coffee
                  size={32}
                  weight="fill"
                  className="rounded-full bg-violet-600 p-2 text-slate-50"
                />
                <span>O café chega fresquinho até você</span>
              </div>
            </div>
          </div>

          <img src="/images/hero.svg" alt="Café do Coffee Delivery" />
        </div>

        <img
          src="/images/hero-bg.svg"
          id="hero-bg"
          alt=""
          className="absolute left-0 top-0 max-h-[544px] w-dvw object-cover"
        />
      </section>

      <section className="mx-auto my-0 flex max-w-[1160px] flex-col gap-14 px-5 pb-36 pt-8">
        <h2 className="font-baloo text-3xl text-stone-700">Nossos cafés</h2>

        <div className="row grid grid-cols-4 gap-x-8 gap-y-10 ">
          {coffees.map((coffee) => (
            <Card key={coffee.id} coffee={coffee} />
          ))}
        </div>
      </section>
    </main>
  )
}
