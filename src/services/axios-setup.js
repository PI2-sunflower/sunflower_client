import axios from "axios";

const BASE_URL = process.env.VUE_APP_HOST_URL;

const getBaseUrl = () =>
  BASE_URL !== undefined ? BASE_URL : "http://127.0.0.1:8000";

const instance = axios.create({
  baseURL: `${getBaseUrl()}/api/`,
  timeout: 3000
});

export default instance;
