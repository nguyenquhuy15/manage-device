import axios from "axios";
import { apiConfig } from "../../config";
import storage from "../../utils/storage";
import AuthApi from "../AuthApi";

const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl
});

axiosClient.interceptors.request.use(async (config) => {
  // add token
  config.headers.Authorization = storage.getToken();
  return config;
});

axiosClient.interceptors.response.use((response) => {
  if (response != undefined && response.data != undefined) {
    // only get data
    return response.data;
  }
  return response;
}, async (error) => {

  // token is expired
  if (error.response && error.response.status === 401) {
    const originalRequest = error.config;
    await AuthApi.refreshToken();
    return axiosClient(originalRequest);
  }

  // internal server
  if (error.response && error.response.status === 500) {
    window.location.href = "/auth/500";
  }

  // Handle errors
  throw error;
});

export default axiosClient;
