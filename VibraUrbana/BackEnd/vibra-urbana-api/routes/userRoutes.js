const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../config/db');
const verifyAdmin = require('../middlewares/authMiddleware');

// Ruta para login y generar token de acceso y refresh token
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT id, username, email, password, role FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error en la base de datos' });

    if (results.length > 0) {
      const user = results[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (!isMatch) return res.status(401).json({ message: 'Credenciales incorrectas' });

        const accessToken = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        return res.json({ accessToken, refreshToken, user });
      });
    } else {
      res.status(401).json({ message: 'Usuario no encontrado' });
    }
  });
});

// Ruta para registrar un nuevo usuario
router.post('/', async (req, res) => {
  const { nombre, apellido, fechaNacimiento, email, username, password, role } = req.body;

  // Validación de campos obligatorios
  if (!nombre || !apellido || !fechaNacimiento || !email || !username || !password || !role) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  // Verificar si el usuario ya existe
  const checkUserQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
  db.query(checkUserQuery, [username, email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error en la base de datos' });

    if (results.length > 0) {
      return res.status(400).json({ message: 'El usuario o el correo electrónico ya están registrados' });
    }

    // Hash de la contraseña
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: 'Error al encriptar la contraseña' });

      // Insertar el nuevo usuario
      const insertQuery = 'INSERT INTO users (nombre, apellido, fechaNacimiento, email, username, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)';
      db.query(insertQuery, [nombre, apellido, fechaNacimiento, email, username, hashedPassword, role], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error al registrar el usuario' });

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
      });
    });
  });
});

// Ruta para refrescar el token
router.post('/refresh-token', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: 'No refresh token provided' });
  }

  // Verificamos el refresh token
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    // Generamos un nuevo access token
    const accessToken = jwt.sign(
      { id: decoded.id, username: decoded.username, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Enviamos el nuevo access token
    res.json({ token: accessToken });
  });
});

// Rutas de CRUD (por ejemplo, obtener, actualizar, eliminar usuarios)
router.get('/', (req, res) => {
  const query = 'SELECT id, username, email, role FROM users';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
    res.json(results);
  });
});

// Actualizar usuario
router.put('/:id', verifyAdmin, (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;
  
  db.query('UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?', 
  [updatedData.username, updatedData.email, updatedData.role, userId], 
  (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
    res.json({ message: 'Usuario actualizado correctamente' });
  });
});

// Eliminar usuario
router.delete('/:id', verifyAdmin, (req, res) => {
  const userId = req.params.id;
  
  db.query('DELETE FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
    res.json({ message: 'Usuario eliminado correctamente' });
  });
});

module.exports = router;
