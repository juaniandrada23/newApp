import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const user = useMemo(() => authService.getCurrentUser(), []);
  const token = useMemo(() => user ? user.token : null, [user]);

  useEffect(() => {
    if (!token) {
      console.error("No token found");
      return;
    }

    axios.get("http://localhost:3000/auth/orders", { headers: { "x-access-token": token } })
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Se encontró un error:", error);
        authService.logout();
        navigate("/login");
      });
  }, [token, navigate]);

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-contessa-100">
          <tr>
            <th scope="col" className="py-3 px-6">ID de Orden</th>
            <th scope="col" className="py-3 px-6">ID de Usuario</th>
            <th scope="col" className="py-3 px-6">Fecha de Orden</th>
            <th scope="col" className="py-3 px-6">Total</th>
            <th scope="col" className="py-3 px-6">Dirección de Envío</th>
            <th scope="col" className="py-3 px-6">Estado</th>
            <th scope="col" className="py-3 px-6">Comentarios</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="bg-contessa-50 border-b">
              <td className="py-4 px-6">{order.id}</td>
              <td className="py-4 px-6">{order.user_id}</td>
              <td className="py-4 px-6">{new Date(order.order_date).toLocaleDateString()}</td>
              <td className="py-4 px-6">{order.total}</td>
              <td className="py-4 px-6">{order.shipping_address}</td>
              <td className="py-4 px-6">{order.status}</td>
              <td className="py-4 px-6">{order.comments}</td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr className="bg-white">
              <td colSpan="7" className="py-4 px-6 text-center">No hay órdenes disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
