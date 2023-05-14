import { configureStore } from "@reduxjs/toolkit";
// ? import authReducer from authSlice
import authReducer from "./features/users/authSlice";
import userReducer from "./features/users/userSlice";
import { productApi } from "./services/products/productApi";
import { userApi } from "./services/users/userApi";

export const store = configureStore({
  reducer: {
    // ? Add the authReducer to the reducer object
    authState: authReducer,
    userState: userReducer,
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
  // ? Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      productApi.middleware,
      userApi.middleware,
    ]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
