require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

const productsRouter = require('./routes/products');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/api/users', userRoutes);  // Asegúrate que esta línea esté correcta
app.use('/api/products', productsRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
