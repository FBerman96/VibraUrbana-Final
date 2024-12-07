import React, { createContext, useContext, useState } from 'react';

// Creamos el contexto
const LoadingContext = createContext();

// Componente proveedor
export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Hook para acceder al contexto
export const useLoading = () => {
  return useContext(LoadingContext);
};
