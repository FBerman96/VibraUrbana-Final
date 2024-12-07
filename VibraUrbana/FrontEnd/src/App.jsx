import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import AdminPanel from './pages/AdminPanel';
import ContactForm from './pages/ContactForm';
import AboutUs from './pages/AboutUs';
import ProtectedRoute from './components/ProtectedRoute';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { LoadingProvider } from './context/LoadingContext';  // Importar LoadingProvider
import LoadingModal from './components/LoadingModal';  // Importar LoadingModal
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <LoadingProvider>
        <CartProvider>
          <AuthProvider>
            <Header />
            <LoadingModal />  {/* Mostrar el modal de carga */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/contacto" element={<ContactForm />} />
              <Route path="/acerca-de-nosotros" element={<AboutUs />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminPanel />
                  </ProtectedRoute>
                } 
              />
            </Routes>
            <Footer />
          </AuthProvider>
        </CartProvider>
      </LoadingProvider>
    </Router>
  );
};

export default App;
