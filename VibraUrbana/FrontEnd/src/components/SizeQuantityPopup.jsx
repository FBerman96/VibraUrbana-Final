import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SizeQuantityPopup = ({ product, onClose, onAddToCart }) => {
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        if (size && quantity > 0) {
            const productWithDetails = {
                ...product, 
                quantity: quantity, 
                size: size,
                subtotal: product.price * quantity, 
            };
    
            console.log("Añadiendo al carrito:", productWithDetails);
            onAddToCart(productWithDetails); 
            onClose();
        } else {
            alert("Por favor, selecciona un talle y cantidad.");
        }
    };

    return (
      <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{product.name}</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="size" className="form-label">Talle:</label>
                <select id="size" className="form-select" value={size} onChange={(e) => setSize(e.target.value)}>
                  <option value="">Seleccione un talle</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">Cantidad:</label>
                <input
                type="text"
                id="quantity"
                className="form-control"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(Number(e.target.value))} 
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-success" onClick={handleAddToCart}>Agregar al carrito</button>
              <button className="btn btn-secondary" onClick={onClose}>Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default SizeQuantityPopup;
