import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchClientContent } from "../services/fetchContent.js";
import Navbar from "./others/Navbar";
import Footer from "./others/Footer";
import ProductCard from "./others/ProductCard";
import Typography from '@mui/material/Typography';

const Shop = () => {
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [user, setUser] = useState(null);
  console.log(content,user)

  useEffect(() => {
    fetchClientContent(navigate, setUser, setContent);
  }, [navigate]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fbf6f5', color: '#643f38' }}>
      <Navbar />
      <div style={{ flexGrow: 1}}>
        <Typography variant="h3" style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Shop</Typography>
        <ProductCard />
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
