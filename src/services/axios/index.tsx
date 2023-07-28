import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
  const fakeToken = localStorage.getItem('fakeToken')
  if (fakeToken) {
    config.headers.Authorization = fakeToken
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});

export { api }