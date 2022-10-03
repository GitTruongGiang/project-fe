import axios from "axios";
import { BASE_URL } from "./config";

const apisevice = axios.create({
  baseURL: BASE_URL,
});

apisevice.interceptors.request.use(
  (request) => {
    console.log("start request", request);
    return request;
  },
  (error) => {
    console.log("request error", error);
    return Promise.reject(error);
  }
);

apisevice.interceptors.response.use(
  (response) => {
    console.log("response", response);
    return response;
  },
  (error) => {
    console.log("response error", error);
    return Promise.reject(error.response.data.errors);
  }
);

export default apisevice;
