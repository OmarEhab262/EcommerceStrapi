import axios from "axios";

export const productsAxios = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
});
