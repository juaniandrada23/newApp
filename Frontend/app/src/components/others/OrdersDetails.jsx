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
      <div className="min-h-screen bg-contessa-200 mx-auto p-6">
        <div className="flex justify-start items-center flex-row gap-5">
          <h1 className="text-3xl font-bold text-contessa-800 mb-2">
            Detalles de la Orden
          </h1>
          <Link to="/cart" className="text-contessa-500 underline">
            Volver al carrito
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
                </div>
              </div>
            ))}
            <div className="mt-6">
              <div className="flex flex-col mb-4">
                <label className="text-contessa-700 mb-2">Dirección de Envío</label>
                <input
                  type="text"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="p-2 border rounded-md"
                />
              </div>
              <div className="flex flex-col mb-6">
                <label className="text-contessa-700 mb-2">Comentarios</label>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="p-2 border rounded-md"
                ></textarea>
              </div>
              <div className="text-2xl font-semibold text-contessa-800 mb-4">
                Total: ${total.toFixed(2)}
              </div>
              <button
                onClick={handleConfirmOrder}
                className="bg-contessa-500 text-white py-2 px-4 rounded-md hover:bg-contessa-600 transition duration-200"
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
