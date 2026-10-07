import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // {id,name,price,category,image,Quantity}
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, amount } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity += amount;
        if (item.quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== id);
        }
      }
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  toggleCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice;
