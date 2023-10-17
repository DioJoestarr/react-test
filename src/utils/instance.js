import axios from "axios";
import JwtService from "../services/JwtService";

const instance = axios.create({
  baseURL: 'https://test-pos.digibird.io/api/v1/front',
  timeout: 300000,
});
instance.interceptors.request.use(
  (request) => {
    request.headers.Authorization = "Bearer " +'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Rlc3QtcG9zLmRpZ2liaXJkLmlvL2FwaS92MS9mcm9udC9zaWduLXVwLXphbG8iLCJpYXQiOjE2OTc1MTMxMTIsImV4cCI6MTY5NzUzNTAxMiwibmJmIjoxNjk3NTEzMTEyLCJqdGkiOiJpd1RGMUtUWlRkdWFqMXM4Iiwic3ViIjoiMjI4MiIsInBydiI6IjFkMGEwMjBhY2Y1YzRiNmM0OTc5ODlkZjFhYmYwZmJkNGU4YzhkNjMifQ.-MjulJe5yV4MsmOVgaKC6mz8fkYT1Q0Me8lWDlcTN18';
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default instance;
