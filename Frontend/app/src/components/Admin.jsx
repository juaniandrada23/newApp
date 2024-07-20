import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { fetchAdminContent } from "../services/fetchContent.js";
import Navbar from "../components/others/Navbar";
import Footer from "../components/others/Footer";

const Admin = () => {
  const [content, setContent] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdminContent(navigate, setUser, setContent);
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-contessa-50 text-contessa-800">
        <header className="bg-contessa-100 text-contessa-800 py-4 px-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </header>
        <div className="flex-grow p-8">
          {user && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-bold mb-4">User Information</h2>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Roles:</strong> {user.roles.join(", ")}
              </p>
              <button
                className="mt-4 bg-contessa-500 text-white py-2 px-4 rounded-md hover:bg-contessa-600 transition duration-200"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Admin Content</h2>
            <p>{content}</p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Admin;
