import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    sessionToken: null,
  },
  reducers: {
    setSessionToken: (state, action) => {
      state.sessionToken = action.payload;
    },
  },
});

export const { setSessionToken } = userSlice.actions;

export const selectSessionToken = (state: RootState) => state.user.sessionToken;

export default userSlice.reducer;
