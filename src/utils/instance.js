import axios from "axios";
import JwtService from "../services/JwtService";

const instance = axios.create({
  baseURL: "https://test-pos.digibird.io/api/v1/front",
  timeout: 300000,
});
instance.interceptors.request.use(
  (request) => {
    request.headers.Authorization = "Bearer " + JwtService.getAccessToken();
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err.response?.status === 401 || err.response?.status === 403) {
      JwtService.clearTokens();
    }
    return Promise.reject(err);
  }
);
export default instance;
