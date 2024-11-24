const mysql = require('mysql2');

// Configuración de la conexión
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'vibra_urbana_db'
});

// Intentar la conexión
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a MySQL:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos MySQL como ID ' + connection.threadId);
});

// Realizar una consulta de prueba
connection.query('SELECT NOW()', (err, results) => {
  if (err) {
    console.error('Error en la consulta:', err.stack);
    return;
  }
  console.log('Hora actual en la base de datos:', results[0]['NOW()']);
});

// Exportar la conexión
module.exports = connection;
