// ProductCard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { MdExpandMore } from "react-icons/md";
import { useCart } from "../../context/CartContext"; // Importa el hook useCart

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filterName, setFilterName] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);

  const marks = [
    { value: 0, label: "$0" },
    { value: 50000, label: "$50000" },
    { value: 100000, label: "$100000" },
  ];

  const navigate = useNavigate();
  const { addToCart } = useCart(); // Usa el hook useCart

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/products")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleNameFilterChange = (event) => {
    setFilterName(event.target.value);
  };

  const handlePriceChange = (event, newValue) => {
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);
  };

  const applyFilters = () => {
    const newFilteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(filterName.toLowerCase()) &&
        product.price >= minPrice &&
        product.price <= maxPrice
    );
    setFilteredProducts(newFilteredProducts);
  };

  const handleCardClick = (id) => {
    navigate(`/products/${id}`);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Accordion className="mb-6">
        <AccordionSummary
          expandIcon={<MdExpandMore className="text-2xl text-contessa-100 font-bold"/>}
          style={{ backgroundColor: "#77463d" }}
        >
          <h1 className="font-bold text-lg text-contessa-100">Filtros</h1>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: "#e4c3bd" }}>
          <div className="grid sm:grid-cols-2 xs:grid-cols-1 gap-12 mb-4">
            <div className="mx-2">
              <TextField
                label="Filtrar por nombre"
                variant="outlined"
                fullWidth
                value={filterName}
                onChange={handleNameFilterChange}
                style={{ marginBottom: "0.5rem" }}
              />
            </div>
            <div className="flex justify-center flex-col items-center">
              <h1 className="mb-1 font-semibold text-lg text-contessa-800">
                Precio
              </h1>
              <Slider
                value={[minPrice, maxPrice]}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={100000}
                marks={marks}
                style={{ width: "50%" }}
              />
            </div>
          </div>
          <div className="flex justify-center w-full">
            <button className="bg-contessa-500 text-white py-2 px-4 rounded-md hover:bg-contessa-600 transition duration-200 flex items-center gap-2" onClick={applyFilters}>
              Aplicar
            </button>
          </div>
        </AccordionDetails>
      </Accordion>
      <div
        className="product-list"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "0.5rem",
        }}
      >
        {filteredProducts.length === 0 ? (
          <div>No products found</div>
        ) : (
          filteredProducts.map((product) => (
            <div
              className="card bg-contessa-300 text-contessa-800 text-center p-6 shadow-lg rounded-lg cursor-pointer"
              key={product.id}
              onClick={() => handleCardClick(product.id)} // Usa la función handleCardClick
            >
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <p className="mb-4">{product.description}</p>
              <p className="text-lg font-semibold">Price: ${product.price}</p>
              <p className="text-sm text-gray-600">Stock: {product.stock}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Evita que el click en el botón dispare el onClick de la card
                  handleAddToCart(product);
                }}
                className="bg-contessa-500 text-white py-2 px-4 rounded-md hover:bg-contessa-600 transition duration-200"
              >
                Añadir al carrito
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductCard;
