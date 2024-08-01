import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Admin from "./components/Admin";
import Home from "./components/Home";
import Shop from "./components/Shop";
import ProtectedRoute from "./services/ProtectedRoute";
import Profile from "./components/Profile";
import ProductDetail from "./components/others/ProductDetail";
import "./styles/app.css";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/others/Cart";
import Failure from "./components/meliRoutes/Failure";
import Success from "./components/meliRoutes/Success";
import Pending from "./components/meliRoutes/Pending";
import OrderDetails from "./components/others/OrdersDetails";
import AddProduct from "./components/others/AddProduct";

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute roles={["client"]}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stockmanagement"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AddProduct />
                </ProtectedRoute>
              }
            />
            <Route path="/shop" element={<Shop />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/success" element={<Success />} />
            <Route path="/failure" element={<Failure />} />
            <Route path="/pending" element={<Pending />} />
            <Route path="/order-details" element={<OrderDetails />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
