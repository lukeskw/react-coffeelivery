import { useContext } from 'react'

import { CartsContext } from '../contexts/CartsContext'

export function useCart() {
  return useContext(CartsContext)
}
