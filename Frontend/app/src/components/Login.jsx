import React, { useState } from "react";
import { Link } from "react-router-dom";
import authService from "../services/authService";
import Footer from "../components/others/Footer";
import Navbar from "../components/others/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(email, password);
      const roles = response.roles || [];
  
      localStorage.setItem('user', JSON.stringify(response));
  
      if (roles.includes("admin")) {
        window.location.href = "/admin";
      } else {
        window.location.href = "/shop";
      }
    } catch (error) {
      console.error("Login error", error);
      setError("Credenciales incorrectas");
    }
  };  

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-contessa-50 text-contessa-800">
        <div className="flex-grow flex flex-col justify-center items-center p-4">
          <form
            className="bg-white p-8 rounded-lg shadow-xl shadow-contessa-800 w-full max-w-md"
            onSubmit={handleLogin}
          >
            <h2 className="text-2xl font-bold text-center text-contessa-800 mb-6">Log in</h2>
            <div className="mb-4">
              <label htmlFor="email" className="block text-contessa-600 mb-2">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-contessa-200 text-contessa-800 font-medium px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-contessa-300"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-contessa-600 mb-2">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-contessa-200 text-contessa-800 font-medium px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-contessa-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-contessa-500 text-white py-2 rounded-md hover:bg-contessa-600 transition duration-200"
            >
              Log in
            </button>
            {error && <p className="text-red-500 font-semibold text-center mt-4">{error}</p>}
            <div className="text-center mt-4">
              ¿No tienes cuenta?{" "}
              <Link to="/register" className="text-contessa-600 hover:text-contessa-800">
                Regístrate
              </Link>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Login;
