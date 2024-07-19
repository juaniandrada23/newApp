import React, { useEffect, useState } from "react";
import Navbar from "./others/Navbar";
import Footer from "./others/Footer";
import ProductCard from "./others/ProductCard";
import { useNavigate } from "react-router-dom";
import { fetchClientContent } from "../services/fetchContent.js";

const Shop = () => {
  const navigate = useNavigate();

  const client = JSON.parse(localStorage.getItem("user"));
  console.log(client);

  const products = [
    {
      id: 1,
      name: "Product 1",
      description: "Description for product 1",
      price: "$10.00",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description for product 2",
      price: "$15.00",
      imageUrl: "https://via.placeholder.com/150",
    },
  ];

  const [content, setContent] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchClientContent(navigate, setUser, setContent);
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-contessa-50 text-contessa-800">
      <Navbar />
      <div className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-4">Shop</h1>
        {user && (
          <>
            <h2 className="text-2xl font-bold mb-4">User Information</h2>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Roles:</strong> {user.roles.join(", ")}
            </p>
            <h1>Content: {content}</h1>
          </>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
