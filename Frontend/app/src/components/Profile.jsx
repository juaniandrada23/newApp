import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./others/Navbar";
import Footer from "./others/Footer";
import authService from "../services/authService";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const user = useMemo(() => authService.getCurrentUser(), []);
  const token = useMemo(() => (user ? user.token : null), [user]);
  const id = useMemo(() => (user ? user.numId : null), [user]);

  useEffect(() => {
    if (!token || !id) {
      console.error("No token or user ID found");
      authService.logout();
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:3000/auth/orders/${id}`, {
        headers: { "x-access-token": token },
      })
      .then((response) => {
        setOrders([response.data]); // Aseguramos que `orders` sea un array
      })
      .catch((error) => {
        console.error("Se encontró un error:", error);
        authService.logout();
        navigate("/login");
      });
  }, [token, id, navigate]);

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-contessa-50 text-contessa-800">
        <div className="flex-grow flex flex-col items-center justify-center mx-4">
          <div className="card w-full max-w-md shadow-xl shadow-contessa-800 bg-contessa-300 my-4 rounded-xl">
            <div className="card-body">
              <h2 className="card-title text-center text-contessa-800">
                Perfil del usuario
              </h2>
              <div className="flex justify-center items-center flex-row">
                <img
                  className="w-28 h-28 rounded-3xl border-2 border-contessa-700 bg-contessa-100 shadow-lg p-1 shadow-contessa-950"
                  src={user.imagen}
                  alt="Imagen de perfil del usuario"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label text-contessa-600 font-semibold">
                  Nombre
                </label>
                <input
                  type="text"
                  value={user.nombre}
                  readOnly
                  className="input input-bordered bg-contessa-200 text-contessa-800"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label text-contessa-600 font-semibold">
                  Apellido
                </label>
                <input
                  type="text"
                  value={user.apellido}
                  readOnly
                  className="input input-bordered bg-contessa-200 text-contessa-800"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label text-contessa-600 font-semibold">
                  Email
                </label>
                <input
                  type="text"
                  value={user.email}
                  readOnly
                  className="input input-bordered bg-contessa-200 text-contessa-800"
                />
              </div>
              <div className="form-control mb-6">
                <label className="label text-contessa-600 font-semibold">
                  Roles
                </label>
                <input
                  type="text"
                  value={user.roles.join(", ")}
                  readOnly
                  className="input input-bordered bg-contessa-200 text-contessa-800"
                />
              </div>
              <div className="orders-container">
                <h3 className="text-contessa-800 font-bold text-lg mb-2">
                  Órdenes del Usuario
                </h3>
                <table className="table-auto w-full text-contessa-800">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>User ID</th>
                      <th>Order Date</th>
                      <th>Total</th>
                      <th>Shipping Address</th>
                      <th>Status</th>
                      <th>Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length > 0 ? (
                      orders.map((order) => (
                        <tr key={order.id} className="bg-contessa-50 border-b">
                          <td className="py-4 px-6">{order.id}</td>
                          <td className="py-4 px-6">{order.user_id}</td>
                          <td className="py-4 px-6">
                            {new Date(order.order_date).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-6">{order.total}</td>
                          <td className="py-4 px-6">{order.shipping_address}</td>
                          <td className="py-4 px-6">{order.status}</td>
                          <td className="py-4 px-6">{order.comments}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center py-4">
                          No se encontraron órdenes.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Profile;
