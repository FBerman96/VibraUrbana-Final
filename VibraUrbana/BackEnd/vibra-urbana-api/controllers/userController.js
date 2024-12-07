const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Obtener todos los usuarios
const getAllUsers = (req, res) => {
  const query = 'SELECT id, username, email, role, "**********" AS password FROM users';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
    res.json(results); // Devuelve la lista de usuarios con la contraseña oculta
  });
};

// Crear un usuario nuevo
const createUser = (req, res) => {
  const { nombre, apellido, fechaNacimiento, username, password, email, role } = req.body;

  const checkQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
  db.query(checkQuery, [username, email], async (err, results) => {
    if (err) {
      console.error('Error al verificar usuario:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }

    if (results.length > 0) {
      return res.status(409).json({ success: false, message: 'El usuario o correo ya existe' });
    }

    try {
      // Hasheo de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      const insertQuery =
        'INSERT INTO users (nombre, apellido, fechaNacimiento, username, password, email, role) VALUES (?, ?, ?, ?, ?, ?, ?)';
      db.query(
        insertQuery,
        [nombre, apellido, fechaNacimiento, username, hashedPassword, email, role || 'cliente'],
        (err) => {
          if (err) {
            console.error('Error al registrar usuario:', err);
            return res.status(500).json({ message: 'Error interno del servidor' });
          }
          res.status(201).json({ success: true, message: 'Usuario registrado exitosamente' });
        }
      );
    } catch (err) {
      console.error('Error al hashear la contraseña:', err);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  });
};

// Obtener un usuario específico por ID
const getUserById = (req, res) => {
  const { id } = req.params;

  const query = 'SELECT id, username, email, role, "**********" AS password FROM users WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error al obtener el usuario:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(results[0]); // Devuelve el usuario con la contraseña oculta
  });
};

module.exports = { getAllUsers, createUser, getUserById };
