import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const refreshToken = localStorage.getItem('refreshToken');
  
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Asignación global del token
  
      axios.get('http://localhost:5000/api/users')
        .then(response => {
          const user = response.data.find(u => u.id === JSON.parse(localStorage.getItem('user')).id);
          if (user) {
            setCurrentUser(user);
          }
          setLoading(false);
        })
        .catch(async (err) => {
          if (err.response?.status === 401 && refreshToken) {
            try {
              const response = await axios.post('http://localhost:5000/api/users/refresh-token', { refreshToken });
              localStorage.setItem('authToken', response.data.token); // Actualiza el token
              axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
  
              const userResponse = await axios.get('http://localhost:5000/api/users');
              const user = userResponse.data.find(u => u.id === JSON.parse(localStorage.getItem('user')).id);
              if (user) setCurrentUser(user);
            } catch (refreshError) {
              console.error('Error al refrescar el token:', refreshError.message);
            }
          }
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);
  

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
