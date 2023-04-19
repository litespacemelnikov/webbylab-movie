import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    loader: false,
    search: "",
  },
  reducers: {
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setLoader, setMovies, setSearch } = moviesSlice.actions;

export const selectMovies = (state: RootState) => state.movies;

export default moviesSlice.reducer;
