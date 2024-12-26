import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type InitialStateType = {
  count: number;
  goods: string[];
};

const initialState: InitialStateType = {
  count: 0,
  goods: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<string>) => {
      state.count += 1;
      state.goods = [...state.goods, action.payload];
    },
    deleteCart: (state, action: PayloadAction<string>) => {
      const index = state.goods.indexOf(action.payload);

      if (index !== -1) {
        state.count -= 1;
        state.goods = state.goods.filter((_, indexItem) => indexItem !== index);
      }
    },
    updateCart: (
      state,
      action: PayloadAction<{ count: number; goods: string[] }>
    ) => {
      state.count = action.payload.count;
      state.goods = action.payload.goods;
    },
    resetCart: (state) => {
      state.count = 0;
      state.goods = [];
    },
  },
});

export const { addCart, updateCart, resetCart, deleteCart } = cartSlice.actions;

export const selectState = (state: RootState) => state.cart;

export default cartSlice.reducer;
