import axios from "axios";
import { BASE_URL } from "../../shared/variables";

export function initAxios() {
  axios.defaults.baseURL = BASE_URL + "/ns_api/v1";
  axios.defaults.timeout = 10000;
}

export function setInterceptor(accessToken: string) {
  axios.interceptors.request.use(async (config) => {
    if (config && config.headers) {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }

    return config;
  });
}
