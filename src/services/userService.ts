import api from './api'; // Importa a instância do Axios configurada

// Tipagem dos DTOs para requisições e respostas
interface CreateUserDto {
  username: string;
  password: string;
  balance: number;
}

interface UpdateUserDto {
  username?: string;
  password?: string;
  balance?: number;
}

interface User {
  id: string;
  username: string;
  balance: number;
}

interface AdminCredentials {
  user: string;
  senha: string;
}

// Serviço para consumir a API de usuários
export const userService = {
  // Obter todos os usuários
  async getUsers(): Promise<User[]> {
    const response = await api.get('/users');
    console.log("🚀 ~ getUsers ~ response:", response)
    return response.data;
  },

  // Obter um usuário pelo ID
  async getUser(id: string): Promise<User> {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Criar um novo usuário
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const response = await api.post('/users', createUserDto);
    return response.data;
  },

  // Atualizar um usuário pelo ID
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const response = await api.put(`/users/${id}`, updateUserDto);
    return response.data;
  },

  // Deletar um usuário pelo ID
  async deleteUser(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  },

  // Autenticar administrador
  async authenticateAdmin(credentials: AdminCredentials): Promise<string> {
    const response = await api.post('/users/auth/admin', credentials);
    return response.data.token; // Supondo que o backend retorne um token
  },
};
