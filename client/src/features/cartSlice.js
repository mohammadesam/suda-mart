import { createSlice } from "@reduxjs/toolkit";

// get cart from localStorage
let stringCart = localStorage.getItem("cart");
let userCart = stringCart != undefined ? JSON.parse(stringCart) : [];

// cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: userCart,
    amount: 0,
  },
  reducers: {
    add: (state, action) => {
      let copy = state.cart;
      let productCopy = copy.find((item) => item._id === action.payload._id);
      if (productCopy !== undefined) {
        let updatedProduct = {
          ...action.payload,
          quantity: productCopy.quantity + 1,
        };
        copy.splice(copy.indexOf(productCopy), 1, updatedProduct);
        state.cart = [...copy];
      } else state.cart = [...state.cart, { ...action.payload, quantity: 1 }];
    },

    // removes item from cart (receives _id)
    remove: (state, action) => {
      let copy = state.cart;
      let cartItem = copy.find((item) => item._id === action.payload);
      copy.splice(copy.indexOf(cartItem), 1);
      state.cart = copy;
    },

    addOne: (state, action) => {
      let copy = state.cart;
      let cartItem = copy.find((item) => item._id === action.payload._id);
      cartItem.quantity += action.payload.value;

      copy.splice(copy.indexOf(cartItem), 1, cartItem);
      state.cart = copy;
    },

    addPunch: (state, action) => {
      state.cart = action.payload;
    },

    changeAmount: (state, action) => {
      state.amount = action.payload;
    },
  },
});

export const { add, remove, addOne, changeAmount, addPunch } =
  cartSlice.actions;
export const getCart = (state) => state.cart.cart;
export const getAmount = (state) => state.cart.amount;
const cartReducer = cartSlice.reducer;
export default cartReducer;
