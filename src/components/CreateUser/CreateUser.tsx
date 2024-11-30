import React, { useState } from 'react';
import { Service } from '../../services/service';
import './CreateUser.css';

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
      const newUser = await Service.createUser({ username, password, balance });
      setMessage(`Usuário ${newUser.username} criado com sucesso!`);
      alert(`Usuário ${newUser.username} criado com sucesso!`);
      navigateToLogin();
    } catch (err) {
      setMessage('Erro ao criar usuário.');
      console.error(err);
    }
  };

  return (
    <div className="create-user-container">
      <h1 className="create-user-title">Criar Usuário</h1>
      <input
        className="create-user-input"
        type="text"
        placeholder="Nome de usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="create-user-input"
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="create-user-buttons">
        <button className="create-user-button" onClick={handleCreateUser}>
          Criar
        </button>
        <button className="create-user-button back-button" onClick={navigateToLogin}>
          Voltar
        </button>
      </div>
      {message && <p className="create-user-message">{message}</p>}
    </div>
  );
};

export default CreateUser;
