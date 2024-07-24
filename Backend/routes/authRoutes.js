import express from 'express';
import authController from '../controllers/authController.js';
import products from '../controllers/Products.js';
import admin from '../controllers/Admin.js';
import clients from '../controllers/Client.js';
import { verifyToken, isAdmin, isClient } from '../middlewares/authMiddleware.js';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const router = express.Router();

// Configurar MercadoPago
const client = new MercadoPagoConfig({ accessToken: "APP_USR-342094393309486-072411-fb26a5669d260bc3e12bf5cb7e821afb-1915971236" });

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.get('/products', products.getAllProducts);
router.get('/products/:id', products.getProductById);

router.get('/orders', verifyToken, isAdmin, admin.getAllOrders);
router.get('/orders/:user_id', verifyToken, isClient, clients.getMyOrders);

router.post("/create_preference", async (req, res) => {
  if (!req.body.items) {
    return res.status(400).json({ error: "No items provided" });
  }

  const items = req.body.items.map(item => ({
    title: item.name,
    quantity: Number(item.quantity),
    unit_price: Number(item.price),
    currency_id: "ARS"
  }));

  const body = {
    items,
    back_urls: {
      success: "http://localhost:3001/success",
      failure: "http://localhost:3001/failure",
      pending: "http://localhost:3001/pending"
    },
    auto_return: "approved"
  };

  try {
    const preference = await new Preference(client).create(body);
    res.json({ redirectUrl: preference.body.init_point });
  } catch (error) {
    console.error("Error creating preference:", error);
    res.status(500).json(error);
  }
});

export default router;
