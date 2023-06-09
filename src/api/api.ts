import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  ENDPOINT_BASE_URL,
  ENDPOINT_MOVIES,
  ENDPOINT_MOVIES_IMPORT,
  ENDPOINT_SESSION,
  ENDPOINT_USERS,
} from "../constants/endpoints";
import { errors } from "../constants/errors";
import { STORAGE_SESSION_TOKEN } from "../constants/storage";
import { showAlert } from "../store/alert";
import { store } from "../store/store";

// Create axios intance.
export const axiosIntance = axios.create({
  baseURL: ENDPOINT_BASE_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Interceptors.
// Response interceptor.
axiosIntance.interceptors.response.use(
  (response) => {
    if (response.data.status === 0 && response.data.error.code) {
      store.dispatch(showAlert(errors[response.data.error.code] || errors.WENTWRONG));
      throw new Error();
    }

    return response;
  },
  (error) => Promise.reject(error)
);

// Request interceptor.
axiosIntance.interceptors.request.use(
  async (config) => {
    const jsonValue = await AsyncStorage.getItem(STORAGE_SESSION_TOKEN);
    const token = JSON.parse(jsonValue);
    if (token) config.headers.Authorization = token;

    return config;
  },
  (error) => Promise.reject(error)
);

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => await axiosIntance.post(ENDPOINT_SESSION, { email, password });

export const register = async ({
  name,
  email,
  password,
  confirmPassword,
}: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) =>
  await axiosIntance.post(ENDPOINT_USERS, {
    name,
    email,
    password,
    confirmPassword,
  });

export const getMovies = async ({
  limit = 100, // TODO: Create pagination for FlatList (onEndReached)
  offset = 0,
  search = "",
}: {
  limit?: number;
  offset?: number;
  search: string;
}) =>
  await axiosIntance.get(
    `${ENDPOINT_MOVIES}?order=DESC&limit=${limit}&offset=${offset}${
      search === "" ? "" : `&search=${search}`
    }`
  );

export const getMovieById = async (id: string) =>
  await axiosIntance.get(`${ENDPOINT_MOVIES}/${id}`);

export const importMovies = async (file) =>
  await axiosIntance.post(ENDPOINT_MOVIES_IMPORT, file);

export const updateMovie = async (
  id: string,
  {
    title,
    year,
    format,
    actors,
  }: {
    title: string;
    format: string;
    year: string;
    actors: Array<string>;
  }
) =>
  await axiosIntance.patch(`${ENDPOINT_MOVIES}/${id}`, {
    title,
    year,
    format,
    actors,
  });

export const deleteMovie = async (id: string) =>
  await axiosIntance.delete(`${ENDPOINT_MOVIES}/${id}`);

export const createMovie = async ({
  title,
  year,
  format,
  actors,
}: {
  title: string;
  format: string;
  year: string;
  actors: Array<string>;
}) =>
  await axiosIntance.post(ENDPOINT_MOVIES, {
    title,
    year,
    format,
    actors,
  });
