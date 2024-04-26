import { Minus, Plus } from '@phosphor-icons/react'

type Props = {
  quantity: number
  incrementQuantity: () => void
  decrementQuantity: () => void
}

export function QuantityInput({
  quantity,
  incrementQuantity,
  decrementQuantity,
}: Props) {
  return (
    <div className="flex gap-1 rounded-md bg-neutral-200 p-2">
      <button
        onClick={decrementQuantity}
        className="flex items-center bg-transparent"
      >
        <Minus
          size={14}
          className="text-violet-600 transition-all duration-200 hover:text-violet-900"
        />
      </button>
      <span className="pt-0.5 text-stone-800">{quantity}</span>
      <button
        onClick={incrementQuantity}
        className="flex items-center bg-transparent"
      >
        <Plus size={14} />
      </button>
    </div>
  )
}
