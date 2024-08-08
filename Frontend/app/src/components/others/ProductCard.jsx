import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { MdExpandMore, MdShoppingCart } from "react-icons/md";
import { useCart } from "../../context/CartContext";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
});

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filterName, setFilterName] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sortOrder, setSortOrder] = useState("");
  const [open, setOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const marks = [
    { value: 0, label: "$0" },
    { value: 50000, label: "$50000" },
    { value: 100000, label: "$100000" },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();

  const fetchFilteredProducts = useCallback(() => {
    const params = new URLSearchParams(location.search);
    const filters = {
      name: params.get("name") || "",
      minPrice: parseInt(params.get("minPrice")) || 0,
      maxPrice: parseInt(params.get("maxPrice")) || 100000,
      sortOrder: params.get("sortOrder") || "",
    };

    axios
      .get("http://localhost:3000/auth/filtered-products", { params: filters })
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [location.search]);

  useEffect(() => {
    fetchFilteredProducts();
  }, [fetchFilteredProducts]);

  const handleCardClick = (id) => {
    navigate(`/products/${id}`);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleNameFilterChange = (event) => {
    setFilterName(event.target.value);
  };

  const handlePriceChange = (event, newValue) => {
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);
  };

  const handleSortChange = (event) => {
    const newSortOrder = event.target.value;
    setSortOrder(newSortOrder);
    handleApplyFilters(newSortOrder); // Pasa el valor del sortOrder
  };

  const handleApplyFilters = (sortOrderValue) => {
    const params = new URLSearchParams();
    if (filterName) params.append("name", filterName);
    if (minPrice !== undefined) params.append("minPrice", minPrice);
    if (maxPrice !== undefined) params.append("maxPrice", maxPrice);
    if (sortOrderValue || sortOrder) params.append("sortOrder", sortOrderValue || sortOrder);

    navigate(`/shop?${params.toString()}`);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="my-2 mt-4">
        <div className="grid xs:grid-cols-1 md:grid-cols-3 gap-4 mb-5 md:ml-3">
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
              <div className="grid xs:grid-cols-1 gap-2 mb-4 xs:mt-4 md:mt-2">
                <h1 className="mb-1 font-semibold text-lg text-contessa-800">
                  Nombre
                </h1>
                <div className="mx-2">
                  <TextField
                    label="Filtrar por nombre"
                    variant="filled"
                    fullWidth
                    value={filterName}
                    onChange={handleNameFilterChange}
                    sx={{
                      marginBottom: "0.5rem",
                      backgroundColor: "#aa6558",
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                      "& .MuiInputLabel-root": {
                        color: "white",
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "white",
                      },
                      "& .MuiInputLabel-root.MuiFormLabel-filled": {
                        color: "white",
                      },
                      "& .MuiFilledInput-underline:before": {
                        borderBottomColor: "white",
                      },
                      "& .MuiFilledInput-underline:after": {
                        borderBottomColor: "white",
                      },
                      "& .MuiFilledInput-underline:hover:before": {
                        borderBottomColor: "white",
                      },
                    }}
                  />
                </div>
                <h1 className="mb-1 font-semibold text-lg text-contessa-800">
                  Precio
                </h1>
                <div className="flex justify-center flex-col items-center">
                  <Slider
                    value={[minPrice, maxPrice]}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100000}
                    marks={marks}
                    sx={{
                      width: "80%",
                      "& .MuiSlider-thumb": {
                        color: "#77463d", // Color del thumb
                      },
                      "& .MuiSlider-track": {
                        color: "#aa6558", // Color del track
                      },
                      "& .MuiSlider-rail": {
                        color: "#8e5347", // Color del rail
                      },
                      "& .MuiSlider-valueLabel": {
                        color: "#ffffff", // Color del texto del valor
                        backgroundColor: "#ba7264", // Color de fondo del valor
                      },
                      "& .MuiSlider-mark": {
                        color: "#d3a096", // Color de las marcas
                      },
                      "& .MuiSlider-markLabel": {
                        color: "#aa6558", // Color del texto de las marcas
                      },
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-center w-full">
                <button
                  className="bg-contessa-800 text-contessa-50 py-2 px-4 rounded-md hover:bg-contessa-900 transition duration-200 flex items-center gap-2 font-medium"
                  onClick={() => handleApplyFilters(sortOrder)}
                >
                  Aplicar
                </button>
              </div>
            </AccordionDetails>
          </Accordion>

          <div className="md:col-start-2 md:col-span-2">
            <div className="font-semibold">
              <div className="flex md:justify-end xs:justify-center mr-5">
                <Select
                  value={sortOrder}
                  onChange={handleSortChange}
                  displayEmpty
                  className="mb-6"
                  inputProps={{ "aria-label": "Without label" }}
                  style={{ minWidth: 200 }}
                  sx={{
                    backgroundColor: "#77463d",
                    color: "#fbf6f5",
                    fontFamily: "Montserrat, sans-serif",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#d3a096",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ba7264",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ba7264",
                    },
                    "& .MuiSvgIcon-root": {
                      color: "#fbf6f5",
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>Ordenar por</em>
                  </MenuItem>
                  <MenuItem value="price-asc">
                    Precio: Más bajo a más alto
                  </MenuItem>
                  <MenuItem value="price-desc">
                    Precio: Más alto a más bajo
                  </MenuItem>
                  <MenuItem value="name-asc">Nombre: A a Z</MenuItem>
                  <MenuItem value="name-desc">Nombre: Z a A</MenuItem>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2">
              {currentProducts.length === 0 ? (
                <div className="col-span-full text-center text-gray-800">
                  No se encontraron productos
                </div>
              ) : (
                currentProducts.map((product) => (
                  <div
                    className="card bg-contessa-300 flex flex-col justify-between text-contessa-800 text-center p-4 shadow-lg rounded-lg cursor-pointer hover:bg-contessa-400 transition-colors duration-300 ease-in-out"
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
                    <p
                      className={`text-sm font-bold ${
                        product.stock < 10 ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {product.stock < 10
                        ? "¡Últimas unidades!"
                        : "¡Stock disponible!"}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
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
            <div className="flex justify-center mt-4">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`mx-1 px-3 py-1 rounded ${
                    currentPage === index + 1
                      ? "bg-contessa-500 text-white"
                      : "bg-white border border-contessa-500 text-contessa-500"
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Snackbar
        sx={{ display: "flex", justifyContent: "center" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          severity="success"
          icon={<MdShoppingCart />}
          sx={{
            fontWeight: "bold",
            backgroundColor: "#ba7264",
            color: "#fbf6f5",
            "& .MuiAlert-icon": {
              color: "#f6ecea",
            },
            "& .MuiAlert-message": {
              color: "#fbf6f5",
            },
          }}
        >
          Producto añadido correctamente.
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default ProductCard;
