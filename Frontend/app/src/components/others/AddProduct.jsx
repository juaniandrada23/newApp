import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import authService from "../../services/authService";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { MdDelete } from "react-icons/md";

const AddProduct = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const user = useMemo(() => authService.getCurrentUser(), []);
  const token = useMemo(() => (user ? user.token : null), [user]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/auth/products");
      setProducts(data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const newProduct = { name, description, price, stock, image };
    try {
      await axios.post("http://localhost:3000/auth/products/add", newProduct, {
        headers: { "x-access-token": token },
      });
      fetchProducts();
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setImage("");
    } catch (error) {
      console.error("Error al añadir producto:", error);
    }
  };

  const handleDeleteProduct = async () => {
    if (productToDelete) {
      try {
        await axios.delete(
          `http://localhost:3000/auth/products/${productToDelete.id}`,
          {
            headers: { "x-access-token": token },
          }
        );
        fetchProducts();
        setShowModal(false);
        setProductToDelete(null);

        const remainingProducts = products.length - 1;
        const totalPagesAfterDeletion = Math.ceil(
          remainingProducts / itemsPerPage
        );
        if (currentPage > totalPagesAfterDeletion) {
          setCurrentPage(totalPagesAfterDeletion);
        }
      } catch (error) {
        console.error("Error al borrar producto:", error);
      }
    }
  };

  const handleShowModal = (product) => {
    setProductToDelete(product);
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
    setProductToDelete(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 640 ? 3 : 4);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const changePage = (offset) => {
    setCurrentPage((prevPage) =>
      Math.max(1, Math.min(prevPage + offset, totalPages))
    );
  };

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const backDisabled = currentPage === 1;
  const isDisabled = currentPage >= totalPages;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow bg-contessa-50 p-4">
        <div className="container mx-auto flex flex-wrap md:flex-nowrap">
          <div className="w-full md:w-1/2 p-4">
            <h1 className="text-xl font-bold text-contessa-800 mb-4">
              Productos Existentes
            </h1>
            <div className="overflow-auto" style={{ maxHeight: "75vh" }}>
              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md p-4 mb-4"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="rounded-md h-32 mx-auto"
                  />
                  <h2 className="text-lg text-contessa-800 font-semibold mt-2">
                    {product.name}
                  </h2>
                  <p className="text-contessa-600">{product.description}</p>
                  <p className="text-contessa-700">Precio: ${product.price}</p>
                  <div className="w-full flex justify-between flex-row">
                    <p className="text-contessa-600">Stock: {product.stock}</p>
                    <MdDelete
                      className="text-4xl text-contessa-50 p-1 rounded-2xl bg-contessa-500 cursor-pointer"
                      onClick={() => handleShowModal(product)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between xs:mt-1 xs:mb-3 md:mt-4 md:mb-0">
              <button
                onClick={() => changePage(-1)}
                disabled={backDisabled}
                className={`py-2 px-4 rounded-md transition duration-200 ${
                  backDisabled
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : "bg-contessa-400 hover:bg-contessa-900 hover:text-contessa-50 text-contessa-950"
                }`}
              >
                Anterior
              </button>
              <h1 className="font-bold text-contessa-800">
                {currentPage} de {totalPages}
              </h1>
              <button
                onClick={() => changePage(1)}
                disabled={isDisabled}
                className={`py-2 px-4 rounded-md transition duration-200 ${
                  isDisabled
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : "bg-contessa-400 hover:bg-contessa-900 hover:text-contessa-50 text-contessa-950"
                }`}
              >
                Siguiente
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-fit p-4 bg-contessa-400 rounded-lg">
            <h2 className="text-xl font-bold text-contessa-800 mb-4">
              Añadir Nuevo Producto
            </h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <input
                type="text"
                placeholder="Nombre del producto"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className=" w-full bg-contessa-200 text-contessa-800 font-medium px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-contessa-300"
              />
              <textarea
                placeholder="Descripción del producto"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className=" w-full bg-contessa-200 text-contessa-800 font-medium px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-contessa-300"
                rows="4"
              />
              <input
                type="number"
                placeholder="Precio"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-contessa-200 text-contessa-800 font-medium px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-contessa-300"
              />
              <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className=" w-full bg-contessa-200 text-contessa-800 font-medium px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-contessa-300"
              />
              <input
                type="text"
                placeholder="URL de imagen"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full bg-contessa-200 text-contessa-800 font-medium px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-contessa-300"
              />
              <button
                type="submit"
                className="w-full bg-contessa-500 text-white p-2 rounded-md hover:bg-contessa-600 transition duration-200"
              >
                Añadir Producto
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-contessa-900 bg-opacity-75">
          <div className="bg-contessa-50 text-contessa-900 p-6 rounded-md shadow-md xs:mx-5 md:mx-0">
            <h2 className="text-lg font-bold mb-4">Confirmar Eliminación</h2>
            <p>
              ¿Está seguro que quiere borrar el siguiente producto:{" "}
              <strong>{productToDelete.name}</strong>?
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleHideModal}
                className="bg-contessa-300 text-contessa-700 px-4 py-2 rounded-md mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteProduct}
                className="bg-contessa-500 text-contessa-50 font-semibold px-4 py-2 rounded-md"
              >
                Borrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
