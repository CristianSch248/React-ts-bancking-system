import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

console.log(import.meta.env.MODE); // 'development' ou 'production'
console.log(import.meta.env.VITE_API_URL); // A URL configurada


const api = axios.create({
  baseURL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('Resposta:', response);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('Erro na resposta:', error.response);
    } else {
      console.error('Erro desconhecido:', error);
    }

    return Promise.reject(error);
  }
);

export default api;
