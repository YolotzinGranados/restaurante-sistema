import { useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function Login() {
  const [nombre_usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function manejarSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const { data } = await axiosClient.post('/auth/login', { nombre_usuario, password });
      localStorage.setItem('token', data.token);
      window.location.href = '/empleados';
    } catch (err) {
      setError('Usuario o contraseña incorrectos');
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '80px' }}>
      <form onSubmit={manejarSubmit} className="card" style={{ width: 320 }}>
        <h2>Iniciar sesión</h2>
        <input
          placeholder="Usuario"
          value={nombre_usuario}
          onChange={(e) => setUsuario(e.target.value)}
          style={{ width: '100%', marginBottom: 8, padding: 8 }}
        />
        <input
          placeholder="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: 8, padding: 8 }}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ width: '100%', padding: 8 }}>Entrar</button>
      </form>
    </div>
  );
}
