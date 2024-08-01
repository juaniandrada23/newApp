import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { MdExpandMore } from "react-icons/md";
import { useCart } from "../../context/CartContext";
import Select from "@mui/material/Select";

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
      <div className="grid xs:grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <Accordion className="md:h-0">
          <AccordionSummary
            expandIcon={
              <MdExpandMore className="text-2xl text-contessa-100 font-bold" />
            }
            style={{ backgroundColor: "#77463d" }}
          >
            <h1 className="font-bold text-lg text-contessa-100">Filtros</h1>
          </AccordionSummary>
          <AccordionDetails style={{ backgroundColor: "#e4c3bd" }}>
            <div className="grid xs:grid-cols-1 gap-2 mb-4">
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
                  style={{ width: "80%" }}
                />
              </div>
            </div>
            <div className="flex justify-center w-full">
              <button
                className="bg-contessa-500 text-white py-2 px-4 rounded-md hover:bg-contessa-600 transition duration-200 flex items-center gap-2"
                onClick={applyFilters}
              >
                Aplicar
              </button>
            </div>
          </AccordionDetails>
        </Accordion>

        <div className="md:col-start-2 md:col-span-4">
          <div className="font-bold">
            <div className="flex justify-end mr-5">
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                className="mb-10"
              >
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center text-gray-800">
                No products found
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div
                  className="card bg-contessa-300 text-contessa-800 text-center p-4 shadow-lg rounded-lg cursor-pointer hover:bg-contessa-400 transition-colors duration-300 ease-in-out"
                  key={product.id}
                  onClick={() => handleCardClick(product.id)}
                >
                  <div className="flex justify-center items-center bg-white rounded-lg h-48">
                    <img
                      className="max-h-full max-w-full object-cover rounded"
                      src={product.image}
                      alt={`prod`}
                    />
                  </div>
                  <h2 className="text-xl font-bold my-2">{product.name}</h2>
                  <p className="text-sm mb-2">{product.description}</p>
                  <p className="text-lg font-semibold">
                    Precio: ${product.price}
                  </p>
                  <p className="text-sm text-gray-600">
                    Stock: {product.stock}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents click on the button from triggering the onClick on the card
                      handleAddToCart(product);
                    }}
                    className="mt-2 bg-contessa-500 font-semibold text-white py-2 px-4 rounded hover:bg-contessa-600 focus:outline-none focus:ring-2 focus:ring-contessa-500 focus:ring-opacity-50"
                  >
                    Añadir al carrito
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
