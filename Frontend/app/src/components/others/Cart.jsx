import React from "react";
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();
  console.log(cart);

  const total = cart.reduce(
    (sum, product) => sum + parseFloat(product.price) * product.quantity,
    0
  );

  const handleProceedToOrder = () => {
    navigate("/order-details");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-contessa-200 mx-auto p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-3 xs:gap-2 sm:gap-5">
          <h1 className="text-2xl sm:text-3xl font-bold text-contessa-800 mb-2 xs:mb-0">
            Carrito de Compras
          </h1>
          <Link to="/shop" className="text-contessa-500 underline xs:mb-2 sm:mb-0">
            Volver a la tienda
          </Link>
        </div>
        {cart.length === 0 ? (
          <div className="text-contessa-700">
            <p>No hay productos en el carrito.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6">
            {cart.map((product, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center bg-contessa-50 p-4 rounded-md shadow-md"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full sm:w-24 h-24 rounded-md object-cover"
                />
                <div className="mt-3 sm:mt-0 sm:ml-4 flex-grow">
                  <h2 className="text-xl sm:text-2xl font-semibold text-contessa-800">
                    {product.name}
                  </h2>
                  <p className="text-contessa-600">{product.description}</p>
                  <p className="text-lg font-semibold text-contessa-900">
                    ${product.price}
                  </p>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-4 flex items-center">
                  <p className="text-contessa-600 mr-2 sm:mr-4">
                    Cantidad: {product.quantity}
                  </p>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="bg-red-500 text-white py-1 px-2 sm:px-3 rounded-md hover:bg-red-600 transition duration-200"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-6 flex flex-col sm:flex-row justify-end items-start sm:items-center">
              <div className="text-xl sm:text-2xl font-semibold text-contessa-800 mr-0 sm:mr-4">
                Total: ${total.toFixed(2)}
              </div>
              <button
                onClick={handleProceedToOrder}
                className="mt-3 sm:mt-0 bg-contessa-500 text-white py-2 px-4 rounded-md hover:bg-contessa-600 transition duration-200"
              >
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
