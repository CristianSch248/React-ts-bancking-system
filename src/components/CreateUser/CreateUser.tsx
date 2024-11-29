// src/components/CreateUser/CreateUser.ts
import React, { useState } from 'react';
import { userService } from '../../services/userService';

interface CreateUserProps {
  navigateToLogin: () => void;
}

const CreateUser: React.FC<CreateUserProps> = ({ navigateToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [balance] = useState(0);
  const [message, setMessage] = useState<string | null>(null);

  const handleCreateUser = async () => {
    try {
      const newUser = await userService.createUser({ username, password, balance });
      setMessage(`Usuário ${newUser.username} criado com sucesso!`);
      alert(`Usuário ${newUser.username} criado com sucesso!`);
      navigateToLogin();
    } catch (err) {
      setMessage('Erro ao criar usuário.');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Criar Usuário</h1>
      <input
        type="text"
        placeholder="Nome de usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleCreateUser}>Criar</button>
      <button onClick={navigateToLogin}>Voltar</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateUser;
