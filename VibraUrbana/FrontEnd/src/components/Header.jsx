import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/logo.png';
import { ClipLoader } from 'react-spinners'; // Importa el spinner

const Header = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate(); // Define el hook de navegación
  const [loading, setLoading] = useState(false); // Estado para controlar el loading

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log('Usuario almacenado en localStorage:', storedUser);
  
    if (storedUser && !currentUser) {
      console.log('Estableciendo usuario desde localStorage:', storedUser);
      setCurrentUser(JSON.parse(storedUser)); // Asegurarse de que el usuario se carga desde localStorage
    }
  }, [currentUser, setCurrentUser]);

  console.log('Estado actual de currentUser en Header:', currentUser);

  const logout = () => {
    setLoading(true); // Muestra el spinner cuando empieza el logout

    // Simula una pequeña espera para el logout (puedes omitir esto si no lo necesitas)
    setTimeout(() => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      setCurrentUser(null);
      navigate('/login'); // Redirige al Login después de hacer logout
      setLoading(false); // Oculta el spinner una vez que se complete el logout
    }, 650); // Simulando un delay de 500ms para el logout
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Vibra Urbana Logo" style={{ height: '90px', width: 'auto' }} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/products">Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">Carrito</Link>
            </li>
            {!currentUser ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Registrarse</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <span className="nav-link">Hola, {currentUser.username}</span>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn" onClick={logout} disabled={loading}>Logout</button>
                </li>
                {currentUser.role === 'admin' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">Admin Panel</Link>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Modal con el spinner */}
      {loading && (
        <div className="modal show d-block" tabIndex="-1" aria-labelledby="logoutModalLabel" style={{ display: 'block' }} aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content bg-dark text-light">
              <div className="modal-header border-0">
                <h5 className="modal-title" id="logoutModalLabel" style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Cerrando sesión...</h5>
              </div>
              <div className="modal-body text-center">
                <ClipLoader color="#ffffff" size={50} />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
