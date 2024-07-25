import React from "react";
import Navbar from "../others/Navbar";
import Footer from "../others/Footer";

const Success = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-contessa-50">
        <div className="bg- rounded-2xl bg-green-200 flex justify-center items-center flex-col">
          <h1 className="text-4xl text-green-600 font-extrabold">
            PAGO REALIZADO CON EXITO
          </h1>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Success;
