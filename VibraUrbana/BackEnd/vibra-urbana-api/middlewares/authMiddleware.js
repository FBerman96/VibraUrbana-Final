const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Asegúrate de que esta ruta sea correcta y apunte a tu conexión a la base de datos

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [decoded.id], (err, results) => {
      if (err) {
        console.error('Error en la base de datos:', err);
        return res.status(500).json({ message: 'Error en la base de datos' });
      }

      if (!results.length) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
      }

      req.user = results[0];
      next();
    });
  } catch (err) {
    console.error('Error en el middleware:', err.message);
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};


module.exports = authMiddleware;
