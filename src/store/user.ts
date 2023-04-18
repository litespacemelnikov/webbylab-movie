import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    sessionToken: null,
    loader: false
  },
  reducers: {
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
    setSessionToken: (state, action) => {
      state.sessionToken = action.payload;
    },
  },
});

export const { setSessionToken, setLoader } = userSlice.actions;

export const selectSessionToken = (state: RootState) => state.user.sessionToken;
export const selectUserLoader = (state: RootState) => state.user.loader;

export default userSlice.reducer;
