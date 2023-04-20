import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const initActiveMovie = {
  title: "",
  year: "",
  id: 0,
  format: '',
  actors: [
    {
      name: ""
    }
  ]
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    loader: false,
    search: "",
    activeMovie: initActiveMovie,
  },
  reducers: {
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setActiveMovie: (state, action) => {
      state.activeMovie = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setLoader, setMovies, setSearch, setActiveMovie } =
  moviesSlice.actions;

export const selectMovies = (state: RootState) => state.movies;

export default moviesSlice.reducer;
