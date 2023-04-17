import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./alert";
import userReducer from "./user";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
