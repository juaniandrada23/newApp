import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import authService from "../../services/authService";
import { SlLogout, SlLogin } from "react-icons/sl";
import { FaUser } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);

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
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="bg-contessa-100 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-contessa-800">
            MJ Joyería
          </Link>
        </div>
        {location.pathname !== '/login' && (
          <>
            <div className="lg:hidden">
              <button
                className="text-contessa-800 focus:outline-none"
                onClick={handleMenuToggle}
              >
                {menuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
              </button>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                <>
                  {user.profilePicture && (
                    <img src={user.profilePicture} alt="Perfil" className="rounded-full w-10 h-10"/>
                  )}
                  <button
                    onClick={handleLogout}
                    className="bg-contessa-500 text-white py-2 px-4 rounded-md hover:bg-contessa-600 transition duration-200 flex items-center gap-2"
                  >
                    Logout <SlLogout />
                  </button>
                  <Link to="/profile">
                    <button className="bg-contessa-300 text-contessa-800 py-2 px-4 rounded-md hover:bg-contessa-400 transition duration-200 flex items-center gap-2">
                      Perfil <FaUser />
                    </button>
                  </Link>
                </>
              ) : (
                <Link to="/login">
                  <button className="bg-contessa-500 text-white py-2 px-4 rounded-md hover:bg-contessa-600 transition duration-200 flex items-center gap-2">
                    Log in <SlLogin />
                  </button>
                </Link>
              )}
            </div>
            <div
              ref={menuRef}
              className={`lg:hidden absolute top-16 right-4 bg-contessa-100 shadow-lg rounded-md w-48 z-10 transition-all duration-300 ease-in-out transform ${menuOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-[-20px] opacity-0 scale-95 pointer-events-none'}`}
            >
              <ul className="p-4 space-y-4">
                {user ? (
                  <>
                    {user.profilePicture && (
                      <li>
                        <img src={user.profilePicture} alt="Perfil" className="rounded-full w-10 h-10 mx-auto"/>
                      </li>
                    )}
                    <li>
                      <button
                        onClick={handleLogout}
                        className="bg-contessa-500 text-white py-2 rounded-md hover:bg-contessa-600 transition duration-200 flex justify-center items-center gap-2 w-full"
                      >
                        Logout <SlLogout />
                      </button>
                    </li>
                    <li>
                      <Link to="/profile">
                        <button className="bg-contessa-300 text-contessa-800 py-2 rounded-md hover:bg-contessa-400 transition duration-200 flex justify-center items-center gap-2 w-full">
                          Perfil <FaUser />
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
