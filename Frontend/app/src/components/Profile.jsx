import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./others/Navbar";
import Footer from "./others/Footer";
import authService from "../services/authService";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate("/");
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

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
                <label className="label text-contessa-600 font-semibold">Nombre</label>
                <input
                  type="text"
                  value={user.nombre}
                  readOnly
                  className="input input-bordered bg-contessa-200 text-contessa-800"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label text-contessa-600 font-semibold">Apellido</label>
                <input
                  type="text"
                  value={user.apellido}
                  readOnly
                  className="input input-bordered bg-contessa-200 text-contessa-800"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label text-contessa-600 font-semibold">Email</label>
                <input
                  type="text"
                  value={user.email}
                  readOnly
                  className="input input-bordered bg-contessa-200 text-contessa-800"
                />
              </div>
              <div className="form-control mb-6">
                <label className="label text-contessa-600 font-semibold">Roles</label>
                <input
                  type="text"
                  value={user.roles.join(", ")}
                  readOnly
                  className="input input-bordered bg-contessa-200 text-contessa-800"
                />
              </div>
              <div className="card-actions flex justify-center items-center flex-row">
                <button className="bg-contessa-500 text-white py-3 rounded-md hover:bg-contessa-600 transition duration-200 px-2 font-semibold text-sm">
                  Modificar
                </button>
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
