import React from "react";
import Navbar from "./others/Navbar";
import Footer from "./others/Footer";
import ProductCard from "./others/ProductCard";

const Shop = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fbf6f5', color: '#643f38' }}>
      <Navbar />
      <div style={{ flexGrow: 1}} className="bg-contessa-200">
        <h1 className="text-5xl font-extrabold ml-4 my-3 text-contessa-900">Productos</h1>
        <ProductCard />
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
