import React, { useState } from 'react';
import { Service } from '../../services/service';
import './Login.css';

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
      const credentials = { user: username, senha: password };
      const userId = isAdmin
        ? await Service.authenticateAdmin(credentials)
        : await Service.authenticateUser(credentials);

      if (userId) {
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
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      {error && <p className="login-error">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="login-field">
          <label className="login-label">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
        </div>
        <div className="login-field">
          <label className="login-label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
        </div>
        <div className="login-field">
          <label className="login-checkbox">
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            Login como Administrador
          </label>
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <button onClick={navigateToCreateUser} className="login-secondary-button">
        Ir para Cadastro
      </button>
    </div>
  );
};

export default Login;
