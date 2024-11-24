import React, { useState } from 'react';
import SizeQuantityPopup from './SizeQuantityPopup';

const ProductCard = ({ product, addToCart }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="card">
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">${product.price}</p>

        <button className="btn btn-success" onClick={() => setShowPopup(true)}>
          Seleccionar Talle y Cantidad
        </button>

        {showPopup && (
          <SizeQuantityPopup
            product={product}
            onClose={() => setShowPopup(false)}
            onAddToCart={addToCart}
          />
        )}
      </div>
    </div>
  );
};

export default ProductCard;
