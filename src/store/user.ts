import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    sessionToken: null,
    loader: false,
    globalLoder: false,
  },
  reducers: {
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
    setGlobalLoader: (state, action) => {
      state.globalLoder = action.payload;
    },
    setSessionToken: (state, action) => {
      state.sessionToken = action.payload;
    },
  },
});

export const { setSessionToken, setGlobalLoader, setLoader } = userSlice.actions;

export const selectSessionToken = (state: RootState) => state.user.sessionToken;
export const selectUserLoader = (state: RootState) => state.user.loader;
export const selectUserGlobalLoader = (state: RootState) =>
  state.user.globalLoder;

export default userSlice.reducer;
