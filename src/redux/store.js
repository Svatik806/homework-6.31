import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartslice";
import filterSlice from "./slices/filterSlice";

export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        filter: filterSlice.reducer,
    }
})