import { useState, useEffect } from 'react'
import { QuantityInput } from './Form/QuantityInput'
import { CheckFat, ShoppingCart } from '@phosphor-icons/react'

type CardProps = {
  coffee: {
    id: string
    title: string
    description: string
    tags: string[]
    price: number
    image: string
  }
}

export function Card({ coffee }: CardProps) {
  const [quantity, setQuantity] = useState(1)
  const [isItemAdded, setIsItemAdded] = useState(false)
  const addItem = (i) => {}

  function incrementQuantity() {
    setQuantity((state) => state + 1)
  }

  function decrementQuantity() {
    if (quantity > 1) {
      setQuantity((state) => state - 1)
    }
  }

  function handleAddItem() {
    addItem({ id: coffee.id, quantity })
    setIsItemAdded(true)
    setQuantity(1)
  }

  useEffect(() => {
    let timeout: number

    if (isItemAdded) {
      timeout = setTimeout(() => {
        setIsItemAdded(false)
      }, 1000)
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [isItemAdded])

  return (
    <div className="flex w-64 flex-col rounded-ee-3xl rounded-ss-md bg-zinc-100 px-5 pb-5 pt-0 text-center">
      <img
        className="-mt-5 max-h-28 max-w-28 self-center"
        src={coffee.image}
        alt={coffee.title}
      />

      <div className="mt-3 flex items-center gap-1 self-center">
        {coffee.tags.map((tag) => (
          <span
            className="rounded-full bg-amber-100 px-2 py-1 font-sans text-xs font-bold uppercase leading-snug text-yellow-600"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>

      <h3 className="mt-4 font-baloo text-lg font-bold leading-snug text-stone-800">
        {coffee.title}
      </h3>

      <span className="mt-2 w-full font-sans text-sm leading-snug">
        {coffee.description}
      </span>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-0.5">
          <span className="font-sans text-sm leading-snug">$</span>
          <span className="font-baloo text-2xl font-bold leading-snug">
            {coffee.price.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <QuantityInput
            quantity={quantity}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
          />

          <button
            disabled={isItemAdded}
            onClick={handleAddItem}
            className={`${isItemAdded ? 'bg-yellow-600' : 'bg-violet-900'} hover:${isItemAdded ? 'bg-amber-400' : 'bg-violet-600'} flex rounded-md p-2 transition-colors duration-200`}
          >
            {isItemAdded ? (
              <CheckFat weight="fill" size={22} className="text-zinc-100" />
            ) : (
              <ShoppingCart size={22} className="text-zinc-100" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
