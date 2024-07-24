import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext"; // Importa el hook useCart
import Navbar from "./Navbar";
import Footer from "./Footer";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart(); // Usa el hook useCart

  useEffect(() => {
    axios
      .get(`http://localhost:3000/auth/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-6 bg-contessa-50">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="flex justify-center">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="rounded-lg shadow-lg max-w-full"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-contessa-800 mb-4">
              {product.name}
            </h2>
            <p className="text-lg text-contessa-700 mb-4">
              {product.description}
            </p>

            <div className="mb-4">
              <span className="text-2xl font-semibold text-contessa-900">
                ${product.price}
              </span>
            </div>

            <div className="mb-4">
              <span className="text-sm text-gray-600">
                Stock: {product.stock}
              </span>
            </div>

            <button
              onClick={() => addToCart(product)}
              className="bg-contessa-500 text-white py-2 px-4 rounded-md hover:bg-contessa-600 transition duration-200"
            >
              Añadir al carrito
            </button>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-contessa-800 mb-6">
            Detalles del Producto
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xl font-semibold text-contessa-700 mb-2">
                Material
              </h4>
              <p className="text-contessa-600">{product.material}</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-contessa-700 mb-2">
                Dimensiones
              </h4>
              <p className="text-contessa-600">{product.dimensions}</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-contessa-700 mb-2">
                Peso
              </h4>
              <p className="text-contessa-600">{product.weight}</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-contessa-700 mb-2">
                Otras Características
              </h4>
              <p className="text-contessa-600">{product.features}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
