import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;
console.log("🚀 ~ baseURL:", baseURL)

const api = axios.create({
  baseURL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log('Requisição enviada:', config);

    return config;
  },
  (error) => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('Resposta recebida:', response);

    return response;
  },
  (error) => {
    if (error.response) {
      console.error('Erro na resposta:', error.response);

      if (error.response.status === 401) {
        window.location.href = '/login';
      }
    } else {
      console.error('Erro desconhecido:', error);
    }

    return Promise.reject(error);
  }
);

export default api;
