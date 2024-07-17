import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import Navbar from "../components/others/Navbar";
import Footer from "../components/others/Footer";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await authService.register(email, password, role);
      navigate("/login");
    } catch (error) {
      console.error("Register error", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-contessa-50 text-contessa-800">
        <div className="flex-grow flex flex-col justify-center items-center p-4">
          <form
            className="bg-white p-8 rounded-lg shadow-xl shadow-contessa-800 w-full max-w-md"
            onSubmit={handleRegister}
          >
            <h2 className="text-2xl font-bold text-center text-contessa-800 mb-6">
              Register
            </h2>
            <div className="mb-4">
              <label htmlFor="email" className="block text-contessa-600 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-contessa-200 text-contessa-800 font-medium px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-contessa-300"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-contessa-600 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-contessa-200 text-contessa-800 font-medium px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-contessa-300"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="role" className="block text-contessa-600 mb-2">
                Role
              </label>
              <input
                id="role"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="w-full bg-contessa-200 text-contessa-800 font-medium px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-contessa-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-contessa-500 text-white py-2 rounded-md hover:bg-contessa-600 transition duration-200"
            >
              Register
            </button>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            <div className="text-center mt-4">
              ¿Ya tienes cuenta?{" "}
              <Link
                to="/login"
                className="text-contessa-600 hover:text-contessa-800"
              >
                Inicia sesión
              </Link>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Register;
