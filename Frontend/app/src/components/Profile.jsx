import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./others/Navbar";
import Footer from "./others/Footer";
import authService from "../services/authService";
import axios from "axios";
import { Modal } from "@mui/material";
import { LuPackageSearch } from "react-icons/lu";

const Profile = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);

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
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Se encontró un error:", error);
        authService.logout();
        navigate("/login");
      });
  }, [token, id, navigate]);

  const handleOpen = (orderId) => {
    axios
      .get(`http://localhost:3000/auth/ordersdetails/${orderId}`, {
        headers: { "x-access-token": token },
      })
      .then((response) => {
        setOrderDetails(response.data);
        setOpen(true);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
      });
  };

  const handleClose = () => setOpen(false);

  if (!user) {
    return null;
  }

  const totalOrden = orderDetails.length > 0 ? orderDetails[0].total : 0;

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-contessa-50 text-contessa-800">
        <div className="flex-grow flex flex-col items-center justify-center mx-4">
          <div className="card w-full max-w-md md:max-w-2xl lg:max-w-4xl shadow-xl shadow-contessa-800 bg-contessa-300 my-4 rounded-xl">
            <div className="card-body">
              <h2 className="card-title text-center text-contessa-800">
                Perfil del usuario
              </h2>
              <div className="flex justify-center items-center flex-row mb-4">
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
                  Tus órdenes
                </h3>
                <div className="overflow-x-auto">
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
                        <th>Detalles</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.length > 0 ? (
                        orders.map((order) => (
                          <tr
                            key={order.id}
                            className="bg-contessa-50 border-b"
                          >
                            <td className="py-4 px-6">{order.id}</td>
                            <td className="py-4 px-6">{order.user_id}</td>
                            <td className="py-4 px-6">
                              {new Date(order.order_date).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-6">{order.total}</td>
                            <td className="py-4 px-6">
                              {order.shipping_address}
                            </td>
                            <td className="py-4 px-6">{order.status}</td>
                            <td className="py-4 px-6">{order.comments}</td>
                            <td className="py-4 px-6">
                              <button
                                className="p-2 rounded-2xl font-bold bg-contessa-600 text-contessa-50"
                                onClick={() => handleOpen(order.id)}
                              >
                                <LuPackageSearch className="text-3xl" />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" className="text-center py-4">
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
        </div>
        <Footer />
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        className="justify-center items-center flex flex-col"
      >
        <div className="relative bg-[#643f38] border border-[#e4c3bd] shadow-lg p-4 rounded-lg text-white xs:w-5/6 md:w-1/2">
          {orderDetails && orderDetails.length > 0 ? (
            <>
              <h1
                id="order-details-title"
                className="font-semibold text-contessa-100 mb-4"
              >
                Detalles de la Orden - Número de orden:{" "}
                {orderDetails[0].order_id}
              </h1>
              <div
                id="order-details-description"
                className="mt-2 max-h-96 overflow-y-auto"
              >
                {orderDetails.map((detail, index) => (
                  <div
                    key={index}
                    className="flex flex-row mb-4 p-2 bg-contessa-800 rounded-md"
                  >
                    <div className="w-1/2 p-2">
                      <h1>Producto: {detail.name}</h1>
                      <h1>Cantidad: {detail.quantity}</h1>
                      <h1>Precio: ${detail.price}</h1>
                    </div>
                    <div className="w-1/2 flex justify-center items-center">
                      <img
                        className="w-full h-auto object-contain rounded"
                        src={detail.image}
                        alt="Imagen del producto"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-xl my-3 text-contessa-300 font-bold">
                <h1>Total: ${totalOrden}</h1>
              </div>
            </>
          ) : (
            <h1>Cargando detalles...</h1>
          )}
          <div className="flex justify-end mt-1">
            <button
              className="bg-[#ba7264] hover:bg-[#aa6558] font-bold text-white py-2 px-4 rounded"
              onClick={handleClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Profile;
