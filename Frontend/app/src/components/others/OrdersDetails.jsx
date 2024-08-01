import React, { useState, useMemo } from "react";
import { useCart } from "../../context/CartContext";
import authService from "../../services/authService";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

const OrdersDetails = () => {
  const { cart } = useCart();
  const user = useMemo(() => authService.getCurrentUser(), []);
  const id = useMemo(() => (user ? user.numId : null), [user]);
  const [shippingAddress, setShippingAddress] = useState("");
  const [comments, setComments] = useState("");

  const total = cart.reduce(
    (sum, product) => sum + parseFloat(product.price) * product.quantity,
    0
  );

  const createPreference = async () => {
    const items = cart.map(({ id, name, price, quantity }) => ({
      id, // Asegúrate de incluir el ID del producto
      name,
      price: parseFloat(price),
      quantity
    }));
  
    const metadata = {
      user_id: id, // Puedes obtener el ID del usuario desde tu contexto o de otra manera
      shipping_address: shippingAddress,
      comments: comments,
      items: items,
      total: total
    };
  
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/create_preference",
        { items, metadata }
      );
      const { redirectUrl } = response.data;
      return redirectUrl;
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleConfirmOrder = async () => {
    const url = await createPreference();
    if (url) window.location.href = url;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-contessa-200 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6 border-b border-contessa-300">
          <h1 className="text-4xl font-bold text-contessa-800">
            Detalles de la Orden
          </h1>
          <Link to="/cart" className="text-contessa-500 hover:text-contessa-600 transition-colors duration-200 font-medium">
            Volver al carrito
          </Link>
        </div>
        {cart.length === 0 ? (
          <div className="text-center py-10 text-contessa-700">
            <p>No hay productos en el carrito.</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cart.map((product, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row bg-contessa-50 p-6 rounded-lg shadow-lg shadow-contessa-800"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-32 h-32 rounded-lg object-cover mb-4 md:mb-0 md:mr-4"
                />
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <h2 className="text-2xl font-semibold text-contessa-800">
                      {product.name}
                    </h2>
                    <p className="text-contessa-600 mt-2">{product.description}</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-contessa-900 mt-4">
                      ${product.price}
                    </p>
                    <p className="text-base text-contessa-600">
                      Cantidad: {product.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="col-span-full mb-4">
              <div className="mt-10">
                <label className="block text-contessa-600 font-semibold mb-2">Dirección de Envío</label>
                <input
                  type="text"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full bg-contessa-100 text-contessa-800 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:border-contessa-400 focus:ring-1 focus:ring-contessa-400"
                />
              </div>
              <div className="mt-6">
                <label className="block text-contessa-600 font-semibold mb-2">Comentarios</label>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="w-full bg-contessa-100 text-contessa-800 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:border-contessa-400 focus:ring-1 focus:ring-contessa-400"
                  rows="3"
                ></textarea>
              </div>
              <div className="text-2xl font-semibold text-contessa-800 my-6">
                Total: ${total.toFixed(2)}
              </div>
              <button
                onClick={handleConfirmOrder}
                className="bg-contessa-500 text-white py-2 px-6 rounded-md hover:bg-contessa-600 focus:outline-none focus:ring-2 focus:ring-contessa-500 focus:ring-opacity-50 transition duration-200"
              >
                Confirmar Orden y Proceder al Pago
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
  
};

export default OrdersDetails;
