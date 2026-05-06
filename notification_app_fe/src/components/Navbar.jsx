import axios from "axios";

const token = "PASTE_NEW_ACCESS_TOKEN";

const api = axios.create({
  baseURL:
    "http://20.207.122.201/evaluation-service",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default api;