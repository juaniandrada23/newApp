import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./others/Navbar";
import Footer from "./others/Footer";
import authService from "../services/authService";
import axios from "axios";
import { Modal, Box, Typography } from "@mui/material";
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
                                <LuPackageSearch className="text-3xl"/>
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
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h1 id="modal-modal-title" variant="h6" component="h2">
            Detalles de la Orden
          </h1>
          {orderDetails && orderDetails.length > 0 ? (
            <Box id="modal-modal-description" sx={{ mt: 2 }}>
              {orderDetails.map((detail, index) => (
                <Box key={index} mb={2}>
                  <h1>Order ID: {detail.order_id}</h1>
                  <h1>Product ID: {detail.product_id}</h1>
                  <h1>Quantity: {detail.quantity}</h1>
                  <h1>Price: {detail.price}</h1>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography>Cargando detalles...</Typography>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Profile;
