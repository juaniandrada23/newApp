import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <div className="navbar bg-contessa-100 flex justify-between items-center p-4">
      <Link to="/" className="btn btn-ghost normal-case text-xl text-contessa-800 ml-4">
        MJ Joyería
      </Link>

      <div className="flex items-center">
        {user ? (
          <>
            {user.profilePicture && (
              <img src={user.profilePicture} alt="Perfil" className="rounded-full w-10 h-10 mr-2"/>
            )}
            <button onClick={handleLogout} className="bg-contessa-500 text-white py-2 rounded-md hover:bg-contessa-600 transition duration-200 px-3 font-semibold text-sm">
              Logout
            </button>
            <Link to="/profile" className="ml-4">
              <button className="bg-contessa-300 text-contessa-800 py-2 rounded-md hover:bg-contessa-400 transition duration-200 px-3 font-semibold text-sm">
                Perfil
              </button>
            </Link>
          </>
        ) : (
          <Link to="/login">
            <button className="bg-contessa-500 text-white py-2 rounded-md hover:bg-contessa-600 transition duration-200 px-3 font-semibold text-sm">
              Log in
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
