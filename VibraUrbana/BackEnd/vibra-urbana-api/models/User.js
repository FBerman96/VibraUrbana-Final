const db = require('../config/db'); // Importa la conexión de la base de datos

// Función para obtener un usuario por nombre de usuario
const getUserByUsername = (username, callback) => {
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results[0]);
    }
  });
};

// Función para crear un nuevo usuario
const createUser = (userData, callback) => {
  const query = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
  db.query(query, [userData.username, userData.email, userData.password, userData.role], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

// Función para actualizar un usuario
const updateUser = (userId, updatedData, callback) => {
  const query = 'UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?';
  db.query(query, [updatedData.username, updatedData.email, updatedData.role, userId], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};


// Función para eliminar un usuario
const deleteUser = (userId, callback) => {
  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
};
