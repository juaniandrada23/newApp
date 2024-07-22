// Cart.jsx
import React from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  // Calcular el total
  const total = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-contessa-200 mx-auto p-6">
        <div className="flex justify-start items-center flex-row gap-5">
          <h1 className="text-3xl font-bold text-contessa-800 mb-2">
            Carrito de Compras
          </h1>
          <Link to="/shop" className="text-contessa-500 underline">
            Volver a la tienda
          </Link>
        </div>
        {cart.length === 0 ? (
          <div className="text-contessa-700">
            <p>No hay productos en el carrito.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {cart.map((product, index) => (
              <div
                key={index}
                className="flex items-center bg-contessa-50 p-4 rounded-md shadow-md"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-24 h-24 rounded-md object-cover"
                />
                <div className="ml-4 flex-grow">
                  <h2 className="text-2xl font-semibold text-contessa-800">
                    {product.name}
                  </h2>
                  <p className="text-contessa-600">{product.description}</p>
                  <p className="text-lg font-semibold text-contessa-900">
                    ${product.price}
                  </p>
                </div>
                <div className="ml-4 flex items-center">
                  <p className="text-contessa-600 mr-4">
                    Cantidad: {product.quantity}
                  </p>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition duration-200"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-6 flex justify-end">
              <div className="text-2xl font-semibold text-contessa-800 mr-4">
                Total: ${total.toFixed(2)}
              </div>
              <button className="bg-contessa-500 text-white py-2 px-4 rounded-md hover:bg-contessa-600 transition duration-200">
                Proceder al pago
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
