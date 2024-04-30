import React, {
  ReactNode,
  useCallback,
  useState,
  createContext,
  useEffect,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { OrderInfo } from '../pages/Cart'

interface CartItem {
  id: string
  quantity: number
}

interface OrderItem extends OrderInfo {
  id: string
  quantity: number
}

interface Order {
  id: string
  order: OrderInfo
  items: OrderItem[]
  totalPrice: number
}

interface CartContextType {
  carts: CartItem[]
  orders: Order | undefined
  addItem: (item: CartItem) => void
  checkout: (order: Order) => void
  incrementItemQuantity: (id: string) => void
  decrementItemQuantity: (id: string) => void
  removeItem: (id: string) => void
}

interface CartsProviderProps {
  children: ReactNode
}

export const CartsContext = createContext({} as CartContextType)

export function CartsProvider({ children }: CartsProviderProps) {
  const [orders, setOrders] = useState<Order | undefined>()
  const [carts, setCarts] = useState<CartItem[]>(() => {
    const storedStateAsJSON = localStorage.getItem(
      '@coffee-delivery:cart-state-1.0.0',
    )
    return storedStateAsJSON ? JSON.parse(storedStateAsJSON) : []
  })

  const navigate = useNavigate()

  const checkout = useCallback(
    (order: Order) => {
      setOrders(order)
      setCarts([])
      if (order) {
        navigate(`/order/${order.id}/success`)
      }
    },
    [navigate],
  )

  const addItem = useCallback(
    (item: CartItem) => {
      const itemIndex = carts.findIndex((cartItem) => cartItem.id === item.id)
      if (itemIndex !== -1) {
        const updatedCarts = [...carts]
        updatedCarts[itemIndex] = {
          ...updatedCarts[itemIndex],
          quantity: item.quantity,
        }
        setCarts(updatedCarts)
      } else {
        setCarts((prevCarts) => [...prevCarts, item])
      }
    },
    [carts],
  )

  const updateItemQuantity = useCallback((id: string, delta: number) => {
    setCarts((prevCarts) =>
      prevCarts.map((item) => {
        if (item.id === id) {
          const updatedQuantity = item.quantity + delta
          return { ...item, quantity: Math.max(updatedQuantity, 1) }
        }
        return item
      }),
    )
  }, [])

  const incrementItemQuantity = useCallback(
    (id: string) => {
      updateItemQuantity(id, 1)
    },
    [updateItemQuantity],
  )

  const decrementItemQuantity = useCallback(
    (id: string) => {
      updateItemQuantity(id, -1)
    },
    [updateItemQuantity],
  )

  const removeItem = useCallback((id: string) => {
    setCarts((prevCarts) => prevCarts.filter((item) => item.id !== id))
  }, [])

  useEffect(() => {
    localStorage.setItem(
      '@coffee-delivery:cart-state-1.0.0',
      JSON.stringify(carts),
    )
  }, [carts])

  return (
    <CartsContext.Provider
      value={{
        carts,
        orders,
        addItem,
        incrementItemQuantity,
        decrementItemQuantity,
        checkout,
        removeItem,
      }}
    >
      {children}
    </CartsContext.Provider>
  )
}
