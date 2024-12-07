import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Circles } from 'react-loader-spinner'; // Importar el loader animado

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);  // Estado de carga
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Activa el loader al enviar los datos
  
    const role = 'cliente'; // Rol por defecto
  
    try {
      console.log('Enviando datos de usuario:', { nombre, apellido, fechaNacimiento, email, username, password, role });
  
      const response = await axios.post('http://localhost:5000/api/users', { 
        nombre, apellido, fechaNacimiento, email, username, password, role 
      });
  
      if (response.status === 201) {
        navigate('/login');
        toast.success('Usuario registrado exitosamente', {
          position: "top-center", // Posición centrada en la parte superior
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          style: {
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
            textAlign: "center",
            borderRadius: "10px",
          },
        });
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      const errorMessage = error.response ? error.response.data.message : 'Error desconocido';
      toast.error('Error al registrar el usuario: ' + errorMessage, {
        position: "top-center", // Posición centrada en la parte superior
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        style: {
          color: "white",
          fontWeight: "bold",
          fontSize: "16px",
          textAlign: "center",
          borderRadius: "10px",
        },
      });
    } finally {
      setLoading(false);  // Desactiva el loader al terminar
    }
  };
  

  return (
    <div className="container mt-5">
      <h2>Registrar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            id="nombre"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="apellido" className="form-label">Apellido</label>
          <input
            type="text"
            id="apellido"
            className="form-control"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento</label>
          <input
            type="date"
            id="fechaNacimiento"
            className="form-control"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Cargando...' : 'Registrar'}
        </button>
      </form>
      
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

export default Register;
