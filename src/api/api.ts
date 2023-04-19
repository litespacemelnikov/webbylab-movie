import axios from "axios";
import {
  ENDPOINT_BASE_URL,
  ENDPOINT_SESSION,
  ENDPOINT_USERS,
} from "../constants/endpoints";
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
      store.dispatch(showAlert(response.data.error.code));
      throw new Error();
    }

    return response;
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
