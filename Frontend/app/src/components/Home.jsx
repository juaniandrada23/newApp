import React from "react";
import Navbar from "./others/Navbar";
import Footer from "./others/Footer";
import { Link } from "react-router-dom";
import imagenFondo from '../assets/images/silverimage.jpg';
import { FaShoppingBag } from "react-icons/fa";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-contessa-50 text-contessa-800">
      <Navbar />
      <main className="flex-grow">
        <div
          className="hero min-h-screen flex flex-col justify-center items-center p-4 xs:p-6 md:p-8 text-center bg-cover bg-center relative"
          style={{ backgroundImage: `url(${imagenFondo})` }}
        >
          <div className="absolute inset-0 bg-contessa-950 opacity-60"></div>
          <div className="relative z-10">
            <h2 className="text-3xl xs:text-4xl lg:text-6xl font-bold text-contessa-50 mb-4">
              Discover Exquisite Jewelry Collections
            </h2>
            <p className="mt-4 text-base xs:text-lg lg:text-xl text-contessa-200 max-w-xl lg:max-w-2xl mx-auto">
              Emprendimiento con 8 años de trayectoria, ubicado en La Rioja,
              Argentina. Explora nuestra exclusiva colección y encuentra la pieza
              perfecta para adornarte o regalar a un ser querido.
            </p>
            <div className="flex justify-center items-center">
              <Link to="/login">
                <button
                  className="flex justify-center items-center flex-row gap-2 mt-6 rounded-2xl font-semibold bg-contessa-500 text-white hover:bg-contessa-600 transition duration-200 px-4 xs:px-6 py-2 xs:py-3 text-base xs:text-lg"
                >
                  Comenzar a comprar <FaShoppingBag className="text-xl"/>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <section className="py-12 bg-contessa-50">
          <div className="container mx-auto grid gap-8 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="card bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="card-body p-6">
                <h3 className="card-title text-2xl font-semibold text-contessa-800">
                  Quality Craftsmanship
                </h3>
                <p className="mt-2 text-contessa-600">
                  Each piece is meticulously crafted with the finest materials.
                </p>
              </div>
            </div>
            <div className="card bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="card-body p-6">
                <h3 className="card-title text-2xl font-semibold text-contessa-800">
                  Exclusive Designs
                </h3>
                <p className="mt-2 text-contessa-600">
                  Unique and elegant designs that you won't find anywhere else.
                </p>
              </div>
            </div>
            <div className="card bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="card-body p-6">
                <h3 className="card-title text-2xl font-semibold text-contessa-800">
                  Customer Satisfaction
                </h3>
                <p className="mt-2 text-contessa-600">
                  Our top priority is to provide you with a delightful shopping
                  experience.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
