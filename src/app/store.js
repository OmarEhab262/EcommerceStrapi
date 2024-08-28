import { configureStore, combineReducers } from "@reduxjs/toolkit";
import loginSlice from "./features/loginSlice";
import cartSlice from "./features/cartSlice";
import globalSlice from "./features/globalSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiSlice } from "./services/apiSlice";
import networkSlice from "./features/networkSlice";

// Configure persist for cart slice
const persistCartConfig = {
  key: "cart",
  storage,
};

// Combine the reducers into a root reducer
const rootReducer = combineReducers({
  cart: persistReducer(persistCartConfig, cartSlice),
  network: networkSlice,
  login: loginSlice,
  global: globalSlice,
  [apiSlice.reducerPath]: apiSlice.reducer, // Ensure API slice is added here
});

// Configure the store and add the persisted reducer
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware), // Correct middleware setup
});

// Create a persistor to handle the persistence
export const persistor = persistStore(store);
