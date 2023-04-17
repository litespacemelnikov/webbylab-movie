import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const alertSlice = createSlice({
  name: "alert",
  initialState: {
    message: null,
  },
  reducers: {
    showAlert: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { showAlert } = alertSlice.actions;

export const selectAlertMessage = (state: RootState) => state.alert.message;

export default alertSlice.reducer;
