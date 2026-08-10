import axios from "axios";

const API = axios.create({
  baseURL: "https://chatverse-lt2x.onrender.com/api",
});

export default API;