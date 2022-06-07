import axios from "axios";
import { BASE_URL } from "./variables";

export const nosearchServiceAxiosInstance = axios.create({
  baseURL: `${BASE_URL}/ns_api/v1`,
  timeout: 1000 * 10,
});

export const setTokenInNosearchServiceAxiosInstance = (accessToken: string) => {
  nosearchServiceAxiosInstance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${accessToken}`;
};
