import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
      <p className="text-contessa-600 mb-2">{product.description}</p>
      <p className="text-xl font-bold text-contessa-800">{product.price}</p>
    </div>
  );
};

export default ProductCard;
