const db = require('../config/db');

// Obtener todos los usuarios
const getAllUsers = (req, res) => {
  const query = 'SELECT id, username, email, role FROM users';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
    res.json(results);
  });
};

// Crear un usuario nuevo
const createUser = (req, res) => {
  const { nombre, apellido, fechaNacimiento, username, password, email, role } = req.body;

  const checkQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
  db.query(checkQuery, [username, email], (err, results) => {
    if (err) {
      console.error('Error al verificar usuario:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }

    if (results.length > 0) {
      return res.status(409).json({ success: false, message: 'El usuario o correo ya existe' });
    }

    const insertQuery =
      'INSERT INTO users (nombre, apellido, fechaNacimiento, username, password, email, role) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(
      insertQuery,
      [nombre, apellido, fechaNacimiento, username, password, email, role || 'cliente'],
      (err) => {
        if (err) {
          console.error('Error al registrar usuario:', err);
          return res.status(500).json({ message: 'Error interno del servidor' });
        }
        res.status(201).json({ success: true, message: 'Usuario registrado exitosamente' });
      }
    );
  });
};

module.exports = { getAllUsers, createUser };
