import api from './api';

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

interface CreateAcquisitionDto {
  descricao: string;
  valor: string;
}

interface Acquisition {
  id: string;
  descricao: string;
  valor: string;
  userId: string;
}

interface Deposit {
  id: string;
  valor: number;
  status: string;
  userId: string;
}

interface CreateDepositDto {
  valor: number;
  status: string;
  userId: string;
}

interface AuthCredentials {
  username: string;
  password: string;
}

export const Service = {
  async getUsers(): Promise<User[]> {
    const response = await api.get('/users');
    return response.data;
  },

  async getUser(id: string): Promise<User> {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const response = await api.post('/users', createUserDto);
    return response.data;
  },

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const response = await api.put(`/users/${id}`, updateUserDto);
    return response.data;
  },

  async deleteUser(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  },

  async getAcquisitions(userId: string): Promise<Acquisition[]> {
    const response = await api.get(`/acquisitions/${userId}`);
    return response.data.compras;
  },

  async createAcquisition(
    userId: string,
    createAcquisitionDto: CreateAcquisitionDto
  ): Promise<{ message: string }> {
    const response = await api.post(`/acquisitions/${userId}`, createAcquisitionDto);
    return response.data;
  },

  async fetchPendingDeposits(): Promise<Deposit[]> {
    const response = await api.get('/deposits/pending');
    return response.data;
  },

  async approveDeposit(deposit: Deposit): Promise<void> {
    const updatedDeposit = { ...deposit, status: 'Aprovado' };
    await api.put('/deposits/approve', updatedDeposit);
  },

  async rejectDeposit(deposit: Deposit): Promise<void> {
    const updatedDeposit = { ...deposit, status: 'Rejeitado' };
    await api.put('/deposits/reject', updatedDeposit);
  },

  async createDeposit(createDepositDto: CreateDepositDto): Promise<{ message: string }> {
    const response = await api.post('/deposits', createDepositDto);
    return response.data;
  },

  async authenticateUser(credentials: AuthCredentials): Promise<string> {
    const response = await api.post('/users/auth/user', credentials);
    return response.data;
  },

  async authenticateAdmin(credentials: AuthCredentials): Promise<string> {
    const response = await api.post('/users/auth/admin', credentials);
    return response.data;
  },
};
