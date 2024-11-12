import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { Produto } from '../../App'
import type { RootState } from '../../store/store'

export interface Cart {
  produtos: Produto[]
  favoritos: Produto[]
  valorTotal: number
}

const initialState: Cart = { produtos: [], favoritos: [], valorTotal: 0 }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<Produto>) => {
      state.produtos.push(action.payload)
      state.valorTotal += action.payload.preco
    },
    addToFavorite: (state, action: PayloadAction<Produto>) => {
      state.favoritos.push(action.payload)
    },
    removeFromFavorite: (state, action: PayloadAction<number>) => {
      state.favoritos = state.favoritos.filter(
        (fav) => fav.id !== action.payload
      )
    }
  }
})

export default cartSlice.reducer

export const { addItemToCart, addToFavorite, removeFromFavorite } =
  cartSlice.actions

export const selectProducts = (state: RootState) => state.cart.produtos

export const selectIsOnProducts = (state: RootState, id: number) =>
  state.cart.produtos.find((fav) => fav.id === id)

export const selectNumProducts = (state: RootState) =>
  state.cart.produtos.length

export const selectTotalValue = (state: RootState) => state.cart.valorTotal

export const selectNumberFavorites = (state: RootState) =>
  state.cart.favoritos.length

export const selectIsOnFavorite = (state: RootState, id: number) =>
  state.cart.favoritos.find((fav) => fav.id === id)
