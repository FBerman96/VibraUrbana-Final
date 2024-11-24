import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './Products.css';

const Products = () => {
  const { addToCart } = useContext(CartContext); // Usamos el contexto de carrito para agregar productos
  const [products, setProducts] = useState([]);  // Estado para almacenar los productos
  const [loading, setLoading] = useState(true);  // Estado para mostrar un mensaje de carga

  // Obtener productos desde la API cuando el componente se monta
  useEffect(() => {
    // Realizamos una solicitud GET a la API para obtener los productos
    axios.get('http://localhost:5000/api/products') // URL de la API
      .then(response => {
        setProducts(response.data);  // Almacenamos los productos en el estado
        setLoading(false);  // Cambiamos el estado de loading a false
      })
      .catch(error => {
        console.error('Error fetching products:', error);  // Mostramos un error si ocurre
        setLoading(false);  // Cambiamos el estado de loading a false
      });
  }, []); // El array vacío significa que solo se ejecuta una vez al montar el componente

  // Función para agregar un producto al carrito
  const handleAddToCart = (product) => {
    addToCart({ ...product });  // Agregamos el producto al carrito
    toast.success(`${product.name} añadido al carrito!`, {  // Mostramos un mensaje de éxito
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      style: {
        color: "white",
        fontWeight: "bold",
        fontSize: "16px",
        textAlign: "center",
        borderRadius: "10px",
      },
    });
  };

  // Si está cargando, mostramos un mensaje de carga
  if (loading) {
    return <div className="container text-center mt-5">Cargando productos...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mt-4 text-center" style={{ marginTop: '50px', marginBottom: '30px', color: '#ff555d', fontWeight: 'bold', fontSize: '3rem', letterSpacing: '2px', textTransform: 'uppercase', position: 'relative', display: 'inline-block', paddingBottom: '10px' }}>
        NUESTROS PRODUCTOS
        <span style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', height: '4px', backgroundColor: '#f91475', borderRadius: '2px' }}></span>
      </h2>
      <div className="row product-row">
        {/* Aquí mapeamos sobre los productos y los mostramos */}
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4 product-column">
            <ProductCard product={product} addToCart={handleAddToCart} />  {/* Pasamos el producto y la función */}
          </div>
        ))}
      </div>

      {/* ToastContainer para los mensajes de éxito al agregar al carrito */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </div>
  );
};

export default Products;
