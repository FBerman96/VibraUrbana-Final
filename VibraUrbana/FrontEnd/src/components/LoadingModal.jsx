import React from 'react';
import { useLoading } from '../context/LoadingContext';  // Importar el hook

const LoadingModal = () => {
  const { loading } = useLoading();  // Obtener el estado de carga

  if (!loading) return null;  // Si no está en carga, no mostrar nada

  return (
    <div className="loading-modal">
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default LoadingModal;
