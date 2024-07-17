import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../services/authService";
import authService from "../services/authService";
import Navbar from "../components/others/Navbar";
import Footer from "../components/others/Footer";

const Admin = () => {
  const [content, setContent] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminContent = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user ? user.token : null;

        if (!token) {
          throw new Error("No token found");
        }

        setUser(user);
        const response = await axiosInstance.get("/auth/admin", {
          headers: { "x-access-token": token },
        });
        setContent(response.data);
      } catch (error) {
        console.error("Admin content error", error);
        setContent("Unauthorized");
        authService.logout();
        navigate("/login");
      }
    };

    fetchAdminContent();
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
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
