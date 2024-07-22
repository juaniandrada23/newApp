// Navbar.js
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { SlLogout, SlLogin } from "react-icons/sl";
import { FaUser, FaShoppingCart } from "react-icons/fa"; // Importa el icono de carrito
import { GiBigDiamondRing } from "react-icons/gi";
import { FiMenu, FiX } from "react-icons/fi";
import { useCart } from "../../context/CartContext"; // Importa el hook useCart

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);
  const { cart } = useCart(); // Usa el hook useCart para obtener el carrito

  const handleLogout = () => {
    authService.logout();
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="bg-contessa-100 p-4 shadow-md relative">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-contessa-800">
            MJ Joyería
          </Link>
        </div>
        {location.pathname !== "/login" && (
          <>
            <div className="lg:hidden">
              <button
                className="text-contessa-800 focus:outline-none"
                onClick={handleMenuToggle}
              >
                {menuOpen ? "" : <FiMenu className="h-6 w-6" />}
              </button>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <Link to="/cart">
                <button className="bg-contessa-300 text-contessa-800 py-2 px-4 rounded-md hover:bg-contessa-400 transition duration-200 flex items-center gap-2">
                  <FaShoppingCart />
                  <span>{cart.length}</span>
                </button>
              </Link>
              {user ? (
                <>
                  {user.imagen && (
                    <Link to="/profile">
                      <img
                        src={user.imagen}
                        alt="Perfil"
                        className="rounded-full w-14 h-14 p-1 bg-contessa-50 mx-auto border-2 border-contessa-700 shadow-md shadow-contessa-800"
                      />
                    </Link>
                  )}
                  <Link to="/profile">
                    <button className="bg-contessa-300 text-contessa-800 py-2 px-4 rounded-md hover:bg-contessa-400 transition duration-200 flex items-center gap-2">
                      Perfil <FaUser />
                    </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-contessa-500 text-white py-2 px-4 rounded-md hover:bg-contessa-600 transition duration-200 flex items-center gap-2"
                  >
                    Logout <SlLogout />
                  </button>
                </>
              ) : (
                <Link to="/login">
                  <button className="bg-contessa-500 text-white py-2 px-4 rounded-md hover:bg-contessa-600 transition duration-200 flex items-center gap-2">
                    Log in <SlLogin />
                  </button>
                </Link>
              )}
            </div>
            {menuOpen && (
              <div
                className="fixed inset-0 bg-contessa-950 bg-opacity-60 z-40"
                onClick={handleMenuToggle}
              ></div>
            )}
            <div
              ref={menuRef}
              className={`lg:hidden fixed top-0 right-0 h-full bg-contessa-200 shadow-md z-50 transition-transform duration-500 ease-in-out transform ${
                menuOpen ? "translate-x-0" : "translate-x-full"
              } w-1/2`}
            >
              <ul className="p-4 space-y-4 h-full flex flex-col justify-start">
                <div className=" flex flex-row justify-end w-full">
                  <FiX className="h-6 w-6" onClick={handleMenuToggle} />
                </div>
                {user ? (
                  <>
                    {user.imagen && (
                      <li className="text-center">
                        <Link to="/profile">
                          <img
                            src={user.imagen}
                            alt="Perfil"
                            className="rounded-full w-14 h-14 p-1 bg-contessa-50 mx-auto border-2 border-contessa-700 shadow-md shadow-contessa-800"
                          />
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link to="/shop">
                        <button className="bg-contessa-300 shadow-md shadow-contessa-800 text-contessa-800 py-2 rounded-md hover:bg-contessa-400 transition duration-200 flex justify-center items-center gap-2 w-full">
                          Productos <GiBigDiamondRing className="text-xl" />
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link to="/profile">
                        <button className="bg-contessa-300 shadow-md shadow-contessa-800 text-contessa-800 py-2 rounded-md hover:bg-contessa-400 transition duration-200 flex justify-center items-center gap-2 w-full">
                          Perfil <FaUser />
                        </button>
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="bg-contessa-500 shadow-md shadow-contessa-800 text-white py-2 rounded-md hover:bg-contessa-600 transition duration-200 flex justify-center items-center gap-2 w-full"
                      >
                        Logout <SlLogout />
                      </button>
                    </li>
                    <h1 className="text-center text-contessa-900 font-semibold">
                      Hola {user.nombre}!
                    </h1>
                    <li>
                      <Link to="/cart">
                        <button className="bg-contessa-300 shadow-md shadow-contessa-800 text-contessa-800 py-2 rounded-md hover:bg-contessa-400 transition duration-200 flex justify-center items-center gap-2 w-full">
                          <FaShoppingCart />
                          <span>{cart.length}</span>{" "}
                          {/* Muestra la cantidad de productos en el carrito */}
                        </button>
                      </Link>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link to="/login">
                      <button className="bg-contessa-500 text-white py-2 rounded-md hover:bg-contessa-600 transition duration-200 flex justify-center items-center gap-2 w-full">
                        Log in <SlLogin />
                      </button>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
