import { createSlice } from "@reduxjs/toolkit";
import { addItemToShoppingCart } from "../../utils";

const initialState = {
  cartProducts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartProducts = addItemToShoppingCart(
        action.payload,
        state.cartProducts
      );
    },
    removeFromCart: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (product) => product.id !== action.payload
      );
    },
    removeAllCart: (state) => {
      state.cartProducts = [];
    },
  },
});
export const { addToCart, removeFromCart, removeAllCart } = cartSlice.actions;
export const selectCart = ({ cart }) => cart;
export default cartSlice.reducer;
