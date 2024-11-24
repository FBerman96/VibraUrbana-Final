// src/components/UsersList.js
import React, { useEffect, useState } from 'react';
import axios from '../api/axios'; // Importa la instancia de Axios

const UsersList = () => {
  const [users, setUsers] = useState([]); // Estado para almacenar los usuarios

  useEffect(() => {
    // Hacer una solicitud GET a la API para obtener los usuarios
    axios.get('/usuarios')
      .then(response => {
        // Si la solicitud es exitosa, actualizamos el estado con los usuarios
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Hubo un error al obtener los usuarios:', error);
      });
  }, []); // El arreglo vacío asegura que la solicitud se haga solo una vez, al cargar el componente

  return (
    <div>
      <h2>Usuarios</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.nombre} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
