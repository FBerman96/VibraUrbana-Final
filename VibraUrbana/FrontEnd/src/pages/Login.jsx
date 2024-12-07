import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Circles } from 'react-loader-spinner'; // Importar el loader animado

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);  // Estado de carga
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Activa el loader al enviar los datos
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { username, password });

      // Crear un campo de asteriscos en base a la longitud de la contraseña
      const maskedPassword = '*'.repeat(password.length);
      const sanitizedUser = { ...response.data.user, password: maskedPassword };

      // Almacenamiento seguro de datos en LocalStorage
      localStorage.setItem('authToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(sanitizedUser));

      setCurrentUser(sanitizedUser);
      navigate('/');
      toast.success('Iniciaste sesión exitosamente');
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response?.data?.message || error.message);
      toast.error('Credenciales inválidas o error del servidor.');
    } finally {
      setLoading(false);  // Desactiva el loader al terminar
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              placeholder="Username"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Cargando...' : 'Iniciar sesión'}
          </button>
        </form>
      </div>

      {/* Agregar el ToastContainer para los mensajes de éxito y error */}
      <ToastContainer theme="dark" position="bottom-right" autoClose={3000} />

      {/* Mostrar el loader tipo modal solo cuando loading sea true */}
      {loading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Fondo semitransparente
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,  // Asegura que el modal esté por encima del contenido
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            <Circles color="#4caf50" height={100} width={100} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
