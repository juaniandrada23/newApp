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
        <div className="flex-grow flex flex-col items-center justify-center">
          <div className="card w-full max-w-md bg-white shadow-xl shadow-contessa-800">
            <div className="card-body">
              <h2 className="card-title text-center text-contessa-800">Perfil del usuario</h2>
              <div className="form-control mb-4">
                <label className="label text-contessa-600">Email</label>
                <input
                  type="text"
                  value={user.email}
                  readOnly
                  className="input input-bordered bg-contessa-200 text-contessa-800"
                />
              </div>
              <div className="form-control mb-6">
                <label className="label text-contessa-600">Roles</label>
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
