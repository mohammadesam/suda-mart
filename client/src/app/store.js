import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import { userReducer } from "../features/userSlice";
import productReducer from "../features/productsSlice";
import { appReducer } from "../features/appSlice";
let store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    products: productReducer,
    settings: appReducer,
  },
});

export default store;
