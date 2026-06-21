import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;