import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    cart: cartReducer
  }
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()