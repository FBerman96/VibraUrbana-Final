// src/api/axios.js
import axios from 'axios';

// Crear una instancia de Axios con la URL base de la API
const instance = axios.create({
  baseURL: 'http://localhost:5000/',  // URL de tu API backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
