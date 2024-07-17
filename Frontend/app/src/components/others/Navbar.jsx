import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-contessa-100 flex justify-between items-center p-4">
      <div className="flex items-center">
        <div className="dropdown lg:hidden">
          <button
            tabIndex={0}
            className="btn btn-ghost"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-contessa-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-contessa-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-contessa-500 font-medium"
            role="menu"
          >
            <li role="none">
              <Link
                to="/about"
                className="hover:text-contessa-600 hover:font-semibold transition duration-200"
                role="menuitem"
              >
                Nosotros
              </Link>
            </li>
            <li role="none">
              <Link
                to="/item3"
                className="hover:text-contessa-600 hover:font-semibold transition duration-200"
                role="menuitem"
              >
                Contacto
              </Link>
            </li>
          </ul>
        </div>
        <Link
          to="/"
          className="btn btn-ghost normal-case text-xl text-contessa-800 ml-4"
        >
          MJ Joyería
        </Link>
      </div>
      <div className="hidden lg:flex items-center">
        <ul
          className="menu menu-horizontal px-1 text-contessa-500 font-medium"
          role="menu"
        >
          <li role="none">
            <Link
              to="/item1"
              className="hover:text-contessa-600 hover:font-semibold transition duration-200"
              role="menuitem"
            >
              Nosotros
            </Link>
          </li>
          <li role="none">
            <Link
              to="/item3"
              className="hover:text-contessa-600 hover:font-semibold transition duration-200"
              role="menuitem"
            >
              Contacto
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center mr-4">
        <Link to="/login">
          <button className="bg-contessa-500 text-white py-2 rounded-md hover:bg-contessa-600 transition duration-200 px-3 font-semibold text-sm">
            Log in
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
