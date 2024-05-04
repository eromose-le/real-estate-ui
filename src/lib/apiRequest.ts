import axios from "axios";

const apiRequest = axios.create({
  baseURL: "http://localhost:8800/api/v1",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default apiRequest;