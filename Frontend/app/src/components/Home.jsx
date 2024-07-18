import React from "react";
import Navbar from "./others/Navbar";
import Footer from "./others/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-contessa-50 text-contessa-800">
      <Navbar />
      <main className="flex-grow">
        <div className="hero min-h-screen bg-contessa-100 flex flex-col justify-center items-center p-4">
          <h2 className="text-4xl lg:text-6xl font-bold text-contessa-800">
            Discover Exquisite Jewelry Collections
          </h2>
          <p className="mt-4 text-lg lg:text-xl text-contessa-600 text-center max-w-2xl">
            Emprendimiento con 8 años de trayectoria, ubicado en La Rioja,
            Argentina. Explora nuestra exclusiva colección y encuentra la pieza
            perfecta para adornarte o regalar a un ser querido.
          </p>
          <div>
            <Link to="/login">
              <button
                className="mt-6 bg-contessa-500 text-white py-2 rounded-md hover:bg-contessa-600 transition duration-200 px-3 font-semibold text-sm"
              >
                Start Shopping
              </button>
            </Link>
          </div>
        </div>
        <section className="py-12 bg-contessa-50">
          <div className="container mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="feature p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-contessa-800">
                Quality Craftsmanship
              </h3>
              <p className="mt-2 text-contessa-600">
                Each piece is meticulously crafted with the finest materials.
              </p>
            </div>
            <div className="feature p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-contessa-800">
                Exclusive Designs
              </h3>
              <p className="mt-2 text-contessa-600">
                Unique and elegant designs that you won't find anywhere else.
              </p>
            </div>
            <div className="feature p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-contessa-800">
                Customer Satisfaction
              </h3>
              <p className="mt-2 text-contessa-600">
                Our top priority is to provide you with a delightful shopping
                experience.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
