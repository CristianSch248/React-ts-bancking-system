import axios from 'axios';
import React, { useState } from 'react';

interface LoginProps {
  onLoginSuccess: () => void;
  navigateToAdminDashboard: () => void;
  navigateToCreateUser: () => void;
}

const Login: React.FC<LoginProps> = ({
  onLoginSuccess,
  navigateToAdminDashboard,
  navigateToCreateUser,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const endpoint = isAdmin
        ? 'http://localhost:3000/users/auth/admin'
        : 'http://localhost:3000/users/auth/user';

      const response = await axios.post(endpoint, {
        user: username,
        senha: password,
      });

      const userId = response.data;

      if (userId && userId !== 0 && userId !== null && userId !== undefined && userId !== '') {
        sessionStorage.setItem('userId', userId);
        console.log('ID do usuário salvo na sessão:', userId);

        setError(null);

        if (isAdmin) {
          navigateToAdminDashboard();
        } else {
          onLoginSuccess();
        }
      } else {
        setError('Falha na autenticação. Verifique suas credenciais.');
      }
    } catch (err: any) {
      console.error('Erro ao autenticar:', err);
      setError(
        err.response?.data?.message || 'Falha na autenticação. Verifique suas credenciais.'
      );
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '10px' }}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            Login como Administrador
          </label>
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '10px',
          }}
        >
          Login
        </button>
      </form>
      <button
        onClick={navigateToCreateUser}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      >
        Ir para Cadastro
      </button>
    </div>
  );
};

export default Login;
