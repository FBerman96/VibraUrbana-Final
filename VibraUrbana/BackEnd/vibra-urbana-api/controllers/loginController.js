const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../config/db');
const { loginUser } = require('../controllers/loginController');

// Login de usuario
router.post('/login', loginUser);

// Registro de usuario
router.post('/', async (req, res) => {
  const { username, password, email, nombre, apellido, fechaNacimiento, role } = req.body;

  const checkUserQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
  db.query(checkUserQuery, [username, email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Error interno del servidor' });
    if (results.length > 0) return res.status(400).json({ message: 'El usuario o correo ya existe' });

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const insertQuery = 'INSERT INTO users (username, password, email, nombre, apellido, fechaNacimiento, role) VALUES (?, ?, ?, ?, ?, ?, ?)';
      db.query(insertQuery, [username, hashedPassword, email, nombre, apellido, fechaNacimiento, role], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error al registrar el usuario' });
        res.status(201).json({ message: 'Usuario registrado exitosamente', userId: result.insertId });
      });
    } catch (err) {
      console.error('Error al encriptar la contraseña:', err);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  });
});

module.exports = router;
