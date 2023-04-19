import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./alert";
import userReducer from "./user";
import moviesReducer from "./movies";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    user: userReducer,
    movies: moviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
