import {
  ReactNode,
  useCallback,
  useState,
  createContext,
  useEffect,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { OrderInfo } from '../pages/Cart'

export interface Cart {
  id: string
  // title: string
  // description: string
  // tags: string[]
  // price: number
  // image: string
  quantity: number
}

export interface Item {
  id: string
  quantity: number
}

// export interface Order extends OrderInfo {
//   id: number
//   items: Item[]
// }

// interface CartState {
//   cart: Item[]
//   orders: Order[]
// }

export interface Order {
  id: string
  order: OrderInfo
  items: {
    quantity: number
    id: string
    title: string
    description: string
    tags: string[]
    price: number
    image: string
  }[]
  totalPrice: number
}

interface CartContextType {
  carts: Item[]
  orders: Order | undefined
  // setCarts: (carts: Cart[]) => void
  addItem: (item: Item) => void
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
  const [orders, setOrders] = useState<Order>()
  const [carts, setCarts] = useState<Item[]>(() => {
    const storedStateAsJSON = localStorage.getItem(
      '@coffee-delivery:cart-state-1.0.0',
    )

    if (storedStateAsJSON) {
      return JSON.parse(storedStateAsJSON)
    }

    return []
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

  function addItem(item: Item) {
    console.log('Add Item:', item, carts)
    const itemAlreadyAdded = carts.find((i) => item.id === i.id)

    console.log(itemAlreadyAdded, 'item already added')
    if (itemAlreadyAdded) {
      console.log(itemAlreadyAdded.quantity, item.quantity)
      itemAlreadyAdded.quantity = item.quantity
    } else {
      setCarts([...carts, item])
    }
    return carts
  }
  function incrementItemQuantity(id: string) {
    setCarts((state) =>
      state.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 }
        }
        return item
      }),
    )
  }
  function decrementItemQuantity(id: string) {
    setCarts((state) =>
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
  function removeItem(id: string) {
    setCarts((state) => state.filter((item) => item.id !== id))
  }

  useEffect(() => {
    if (carts) {
      const stateJSON = JSON.stringify(carts)

      localStorage.setItem('@coffee-delivery:cart-state-1.0.0', stateJSON)
    }
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
