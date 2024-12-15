import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type InitialStateType = {
    count: number,
    goods: string[]
}

const initialState:InitialStateType = {
    count: 0,
    goods: []
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCart: (state, action: PayloadAction<string>) => {
            state.count += 1
            state.goods = [...state.goods, action.payload]
        },
        updateCart: (state, action: PayloadAction<{count: number, goods: string[]}>) => {
            state.count = action.payload.count
            state.goods = action.payload.goods
        },
        resetCart: (state) => {
            state.count = 0
            state.goods = []
        },
    }
})

export const { addCart, updateCart, resetCart } = cartSlice.actions

export const selectState = (state: RootState) => state.cart

export default cartSlice.reducer