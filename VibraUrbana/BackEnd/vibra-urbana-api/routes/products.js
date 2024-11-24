const express = require('express');
const router = express.Router();

// Listado completo de productos
const products = [
  { id: 1, name: 'BLAZER TRAJE ESTRUCTURA', price: 279999, image: 'http://localhost:5000/images/product1.jpg' },
  { id: 2, name: 'CAMISETA BÁSICA HEAVY WEIGHT', price: 42990, image: 'http://localhost:5000/images/product2.jpg' },
  { id: 3, name: 'JEANS CARGO SALPICADURAS', price: 139990, image: 'http://localhost:5000/images/product3.jpg' },
  { id: 4, name: 'CAMISA DENIM', price: 79990, image: 'http://localhost:5000/images/product4.jpg' },
  { id: 5, name: 'VESTIDO MIDI VUELO ZW COLLECTION', price: 245990, image: 'http://localhost:5000/images/product5.jpg' },
  { id: 6, name: 'CAMISETA NUDO ALGODÓN', price: 59990, image: 'http://localhost:5000/images/product6.jpg' },
  { id: 7, name: 'POLO ESTRUCTURA', price: 89990, image: 'http://localhost:5000/images/product7.jpg' },
  { id: 8, name: 'BERMUDA PERLAS', price: 63990, image: 'http://localhost:5000/images/product8.jpg' },
  { id: 9, name: 'CAMISETA SURF VIBES', price: 28990, image: 'http://localhost:5000/images/product9.jpg' },
  { id: 10, name: 'BERMUDA DENIM BÁSICA', price: 79990, image: 'http://localhost:5000/images/product10.jpg' },
  { id: 11, name: 'CONJUNTO SUDADERA Y LEGGING MINNIE MOUSE © DISNEY', price: 63990, image: 'http://localhost:5000/images/product11.jpg' },
  { id: 12, name: 'VESTIDO TEXTO TABLAS TÉCNICO', price: 63990, image: 'http://localhost:5000/images/product12.jpg' },
];

// Ruta para obtener los productos
router.get('/', (req, res) => {
  res.json(products); // Devuelve la lista de productos
});

module.exports = router;
