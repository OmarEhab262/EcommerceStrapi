import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/loginSlice";
import cartSlice from "./features/cartSlice";
import globalSlice from "./features/globalSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistCartConfig = {
  key: "cart",
  storage,
};
const persistCart = persistReducer(persistCartConfig, cartSlice);
export const store = configureStore({
  reducer: {
    cart: persistCart,
    login: loginSlice,
    global: globalSlice,
  },
});

export const persistor = persistStore(store);
