import {
  Bank,
  CreditCard,
  CurrencyDollar,
  MapPin,
  Money,
  Trash,
} from '@phosphor-icons/react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { coffees } from '../../data.json'

import { QuantityInput } from '../components/Form/QuantityInput.tsx'
import { TextInput } from '../components/Form/TextInput.tsx'
import { Radio } from '../components/Form/Radio.tsx'
import { Fragment } from 'react/jsx-runtime'
import { useState } from 'react'

type FormInputs = {
  zip: number
  street: string
  number: string
  fullAddress: string
  neighborhood: string
  city: string
  state: string
  paymentMethod: 'credit' | 'debit' | 'cash'
}

const newOrder = z.object({
  zip: z.number({ invalid_type_error: 'Please provide a valid ZIP code' }),
  street: z.string().min(1, 'Please provide a valid street'),
  number: z.string().min(1, 'Please provide a valid number'),
  fullAddress: z.string(),
  neighborhood: z.string().min(1, 'Please provide a valid neighborhood'),
  city: z.string().min(1, 'Please provide a valid city'),
  state: z.string().min(1, 'Please provide a valid state'),
  paymentMethod: z.enum(['credit', 'debit', 'cash'], {
    invalid_type_error: 'Please provide a valid payment method',
  }),
})

export type OrderInfo = z.infer<typeof newOrder>

const shippingPrice = 3.5

export function Cart() {
  const [cart, setCart] = useState([
    {
      id: '0',
      quantity: 1,
    },
    {
      id: '8',
      quantity: 2,
    },
  ])

  function checkout() {}
  function incrementItemQuantity(id) {
    setCart((state) =>
      state.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 }
        }
        return item
      }),
    )
  }
  function decrementItemQuantity(id) {
    setCart((state) =>
      state.map((item) => {
        if (item.id === id) {
          if (item.quantity > 1) {
            return {
              ...item,
              quantity: item.quantity - 1,
            }
          }
        }
        return item
      }),
    )
  }
  function removeItem(id) {
    setCart((state) => state.filter((item) => item.id !== id))
  }

  const coffeesInCart = cart.map((item) => {
    const coffeeInfo = coffees.find((coffee) => coffee.id === item.id)

    if (!coffeeInfo) {
      throw new Error('Invalid coffee.')
    }

    return {
      ...coffeeInfo,
      quantity: item.quantity,
    }
  })

  const totalItemsPrice = 50

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(newOrder),
  })

  const selectedPaymentMethod = watch('paymentMethod')

  function handleItemIncrement(itemId: string) {
    incrementItemQuantity(itemId)
  }

  function handleItemDecrement(itemId: string) {
    decrementItemQuantity(itemId)
  }

  function handleItemRemove(itemId: string) {
    removeItem(itemId)
  }

  const handleOrderCheckout: SubmitHandler<FormInputs> = (data) => {
    if (cart.length === 0) {
      return alert('You must need to add at least one coffee to your cart')
    }

    checkout(data)
  }
  return (
    <main className="mx-auto my-0 flex max-w-[1160px] gap-8 px-5 py-10">
      <div className="flex flex-col gap-4">
        <h2 className="snug font-baloo text-lg text-stone-700">
          Finish your order
        </h2>

        <form
          id="order"
          onSubmit={handleSubmit(handleOrderCheckout)}
          className="flex flex-col gap-6"
        >
          <div className="flex w-full min-w-[640px] flex-col gap-8 rounded-md bg-zinc-100 p-10">
            <div className="flex gap-2">
              <MapPin size={22} className="text-yellow-600" />

              <div className="">
                <span className="text-stone-700">Delivery Address</span>

                <p className="text-sm leading-snug">
                  Enter the address where you want to receive your order
                </p>
              </div>
            </div>

            <div className="grid gap-3 [grid-template-areas:'zip_._.''street_street_street''number_fullAddress_fullAddress''neighborhood_city_state']">
              <TextInput
                placeholder="zip"
                type="text"
                containerProps={{ style: { gridArea: 'zip' } }}
                error={errors.zip}
                {...register('zip', { valueAsNumber: true })}
              />

              <TextInput
                placeholder="Street"
                containerProps={{ style: { gridArea: 'street' } }}
                error={errors.street}
                {...register('street')}
              />

              <TextInput
                placeholder="Number"
                containerProps={{ style: { gridArea: 'number' } }}
                error={errors.number}
                {...register('number')}
              />

              <TextInput
                placeholder="Line 2"
                optional
                containerProps={{ style: { gridArea: 'fullAddress' } }}
                error={errors.fullAddress}
                {...register('fullAddress')}
              />

              <TextInput
                placeholder="Neighborhood"
                containerProps={{ style: { gridArea: 'neighborhood' } }}
                error={errors.neighborhood}
                {...register('neighborhood')}
              />

              <TextInput
                placeholder="City"
                containerProps={{ style: { gridArea: 'city' } }}
                error={errors.city}
                {...register('city')}
              />

              <TextInput
                placeholder="State"
                maxLength={2}
                containerProps={{ style: { gridArea: 'state' } }}
                error={errors.state}
                {...register('state')}
              />
            </div>
          </div>

          <div className="flex w-full min-w-[640px] flex-col gap-8 rounded-md bg-zinc-100 p-10">
            <div className="flex gap-2">
              <CurrencyDollar size={22} className="text-violet-600" />

              <div>
                <span className="text-stone-700">Payment</span>

                <p className="text-sm leading-snug">
                  Payment is made upon delivery. Choose how you want to pay
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-3">
                <Radio
                  isSelected={selectedPaymentMethod === 'credit'}
                  {...register('paymentMethod')}
                  value="credit"
                >
                  <CreditCard size={16} />
                  <span>Credit card</span>
                </Radio>

                <Radio
                  isSelected={selectedPaymentMethod === 'debit'}
                  {...register('paymentMethod')}
                  value="debit"
                >
                  <Bank size={16} />
                  <span>Debit card</span>
                </Radio>

                <Radio
                  isSelected={selectedPaymentMethod === 'cash'}
                  {...register('paymentMethod')}
                  value="cash"
                >
                  <Money size={16} />
                  <span>Cash</span>
                </Radio>
              </div>

              {errors.paymentMethod ? (
                <p className="text-xs leading-snug text-red-500" role="alert">
                  {errors.paymentMethod.message}
                </p>
              ) : null}
            </div>
          </div>
        </form>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="snug font-baloo text-lg text-stone-700">
          Selected Coffees
        </h2>

        <div className="flex w-full min-w-[448px] flex-col gap-3 rounded-bl-3xl rounded-br-md rounded-tl-md rounded-tr-3xl bg-zinc-100 p-10">
          {coffeesInCart.map((coffee) => (
            <Fragment key={coffee.id}>
              <div className="flex justify-between">
                <div className="flex items-stretch gap-5">
                  <img
                    src={coffee.image}
                    alt={coffee.title}
                    className="size-16"
                  />

                  <div className="flex flex-col justify-between">
                    <span>{coffee.title}</span>

                    <div className="flex gap-2">
                      <QuantityInput
                        quantity={coffee.quantity}
                        incrementQuantity={() => handleItemIncrement(coffee.id)}
                        decrementQuantity={() => handleItemDecrement(coffee.id)}
                      />

                      <button
                        onClick={() => handleItemRemove(coffee.id)}
                        className="flex items-center gap-2 rounded-md bg-neutral-200 px-2 py-1.5 transition-all duration-200 hover:bg-neutral-300"
                      >
                        <Trash className="text-violet-600" />
                        <span className="text-xs uppercase leading-relaxed text-stone-600">
                          Remove
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                <aside className="font-bold">
                  $ {coffee.price?.toFixed(2)}
                </aside>
              </div>

              <span />
            </Fragment>
          ))}

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm leading-snug">Total items</span>
              <span className="text-base leading-snug">
                {new Intl.NumberFormat('en-US', {
                  currency: 'USD',
                  style: 'currency',
                }).format(totalItemsPrice)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm leading-snug">Delivery</span>
              <span className="text-base leading-snug">
                {new Intl.NumberFormat('en-US', {
                  currency: 'USD',
                  style: 'currency',
                }).format(shippingPrice)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xl font-bold leading-snug">Total</span>
              <span className="text-xl font-bold leading-snug">
                {new Intl.NumberFormat('en-US', {
                  currency: 'USD',
                  style: 'currency',
                }).format(totalItemsPrice + shippingPrice)}
              </span>
            </div>
          </div>

          <button
            className="mt-6 w-full rounded-md bg-amber-400 p-3 text-xs font-bold uppercase leading-relaxed text-white transition-all duration-200 hover:bg-yellow-600"
            type="submit"
            form="order"
          >
            Confirm order
          </button>
        </div>
      </div>
    </main>
  )
}
