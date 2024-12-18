const express = require('express');
const axios = require('axios');
const router = express.Router();

// Endpoint de la API externa
const API_URL = "https://fakestoreapi.com/products/category/women's clothing";

router.get('/', async (req, res) => {
  try {
    // Consumir la API externaSS
    const response = await axios.get(API_URL);
    const allProducts = response.data;

    const limitedProducts = allProducts;

    // Transformar la estructura de los productos
    const formattedProducts = limitedProducts.map((product) => ({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
    }));

    res.json(formattedProducts);
  } catch (error) {
    console.error('Error al obtener los productos:', error.message);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

module.exports = router;
