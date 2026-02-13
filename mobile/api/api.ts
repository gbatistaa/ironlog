import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: "http://192.168.0.144:4000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
