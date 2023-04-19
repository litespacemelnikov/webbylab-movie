import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  ENDPOINT_BASE_URL,
  ENDPOINT_MOVIES,
  ENDPOINT_SESSION,
  ENDPOINT_USERS,
} from "../constants/endpoints";
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
    console.log(response);

    if (response.data.status === 0 && response.data.error.code) {
      store.dispatch(showAlert(response.data.error.code));
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
  limit = 10,
  offset = 0,
  search = "",
}: {
  limit?: number;
  offset?: number;
  search: string;
}) =>
  await axiosIntance.get(
    `${ENDPOINT_MOVIES}?order=DESC&limit=${limit}&offset=${offset}${
      search === "" ? '' : `&search=${search}`
    }`
  );
