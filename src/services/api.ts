import axios from 'axios';

// Pega a URL base do arquivo .env
const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL,
  timeout: 10000, // Tempo limite
});

// Interceptor para requisições
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptor para respostas
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
