import React, { useState } from 'react';
import { Service } from '../../services/service';
import './Login.css';

interface LoginProps {
  onLoginSuccess: () => void;
  navigateToAdminDashboard: () => void;
  navigateToCreateUser: () => void;
  navigateToDashboard: () => void; // Verifique se esta linha está no arquivo
}

const Login: React.FC<LoginProps> = ({
  navigateToAdminDashboard,
  navigateToDashboard,
  navigateToCreateUser,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError(null); // Limpa os erros anteriores

    // Validação dos campos
    if (!username.trim() || !password.trim()) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const credentials = { username: username, password: password };
      console.log('Tentando autenticar com as credenciais:', credentials);

      let response: any;
      if (isAdmin) {
        response = await Service.authenticateAdmin(credentials);
        if (response?.statusCode === 200) {
          console.log('Autenticação de admin bem-sucedida.');
          navigateToAdminDashboard();
          return;
        } else {
          setError('Falha na autenticação de administrador.');
        }
      } else {
        response = await Service.authenticateUser(credentials);
        console.log("🚀 ~ handleLogin ~ response:", response)
        if (response) {
          console.log('Autenticação de usuário bem-sucedida.');
          sessionStorage.setItem('userId', response);
          navigateToDashboard();
          return;
        } else {
          setError('Falha na autenticação. Verifique suas credenciais.');
        }
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
