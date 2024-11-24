import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    console.log("Producto a añadir:", product); 

    setCartItems((prevItems) => {
        const existingProduct = prevItems.find(item => item.id === product.id && item.size === product.size);

        if (existingProduct) {
            return prevItems.map(item =>
                item.id === product.id && item.size === product.size
                    ? { 
                        ...item, 
                        quantity: item.quantity + product.quantity,
                        subtotal: item.subtotal + product.subtotal 
                        
                    }
                    : item
            );
        } else {
            return [...prevItems, product]; 
        }
    });
};

  

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
