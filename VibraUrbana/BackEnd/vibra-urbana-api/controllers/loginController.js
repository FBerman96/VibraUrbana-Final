const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const router = express.Router();

// Login de usuario
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], async (err, results) => {
    if (err) {
      console.error('Error en la base de datos:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = results[0];

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar tokens
    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' } // Token de acceso con duración de 15 minutos
    );

    const refreshToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' } // Token de refresco con duración de 7 días
    );

    // Mostrar el campo password como "oculto" basado en su longitud
    const maskedPassword = '*'.repeat(user.password.length);
    user.password = maskedPassword;

    res.json({
      message: 'Login exitoso',
      user,
      accessToken,
      refreshToken,
    });
  });
});

module.exports = router;
