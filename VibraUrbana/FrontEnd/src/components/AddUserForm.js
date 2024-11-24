// src/components/AddUserForm.js
import React, { useState } from 'react';
import axios from '../api/axios'; // Importa la instancia de Axios

const AddUserForm = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario (recarga de página)

    const newUser = { nombre, email, contraseña }; // Datos del nuevo usuario

    // Hacer la solicitud POST para crear un nuevo usuario
    axios.post('/usuarios/crear', newUser)
      .then(response => {
        alert('Usuario creado con éxito');
        setNombre('');
        setEmail('');
        setContraseña('');
      })
      .catch(error => {
        console.error('Error al crear el usuario:', error);
        alert('Hubo un problema al crear el usuario');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Nuevo Usuario</h2>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
        />
      </div>
      <button type="submit">Crear Usuario</button>
    </form>
  );
};

export default AddUserForm;
