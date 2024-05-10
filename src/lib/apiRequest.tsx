import { logoutAction } from "@/utils/logoutUtil";
import axios, { AxiosResponse } from "axios";

const apiRequest = axios.create({
  baseURL: "http://localhost:8800/api/v1",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const setupInterceptors = async () => {
  // Request interceptor
  apiRequest.interceptors.request.use(
    async (config) => {
      // Modify the request config here, such as adding headers
      // For example, you can add a token if you have one stored in localStorage
      // const token = localStorage.getItem("token");
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }s
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  apiRequest.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log("[HTTP RES]:", response);
      // Modify the response data here if needed
      return response;
    },
    async (error) => {
      console.log("[HTTP RES-err]:", error?.response);
      if (error?.response?.status === 401) {
        // Unauthenticated
        logoutAction(error?.response?.data?.error);
        return console.log("401");
      }
      if (error?.response?.status === 403) {
        //  Unauthorized
        logoutAction(error?.response?.data?.error);
        return console.log("403");
      }

      return Promise.reject(error);
    }
  );
};

export default apiRequest;
