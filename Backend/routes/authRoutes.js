import express from 'express';
import authController from '../controllers/authController.js';
import products from '../controllers/Products.js';
import admin from '../controllers/Admin.js';
import clients from '../controllers/Client.js';
import orderController from '../controllers/Order.js';
import { verifyToken, isAdmin, isClient } from '../middlewares/authMiddleware.js';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
console.log(process.env.ACCESS_TOKEN)
const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.get('/products', products.getAllProducts);
router.get('/products/:id', products.getProductById);
router.post('/products/add', verifyToken, isAdmin, products.addProduct)
router.delete('/products/:id', verifyToken, isAdmin, products.deleteProduct); 

router.get('/orders', verifyToken, isAdmin, admin.getAllOrders);
router.get('/orders/:user_id', verifyToken, isClient, clients.getMyOrders);

router.post("/create_preference", async (req, res) => {
  const { items, metadata } = req.body;

  if (!items || !metadata) {
    return res.status(400).json({ error: "No items or metadata provided" });
  }

  const mpItems = items.map(item => ({
    title: item.name,
    quantity: Number(item.quantity),
    unit_price: Number(item.price),
    currency_id: "ARS"
  }));

  const body = {
    items: mpItems,
    back_urls: {
      success: "http://localhost:3001/success",
      failure: "http://localhost:3001/failure",
      pending: "http://localhost:3001/pending"
    },
    auto_return: "approved",
    notification_url: "https://9082-201-235-18-135.ngrok-free.app/auth/webhook",
    metadata: metadata 
  };

  try {
    const preference = await new Preference(client).create({ body });
    res.json({ redirectUrl: preference.init_point });
  } catch (error) {
    console.error('Error creating preference:', error);
    res.status(500).json(error);
  }
});

router.post("/webhook", orderController.handlePaymentNotification(client.accessToken));
router.get('/ordersdetails/:order_id', verifyToken, isClient, orderController.getMyOrdersDetails);

export default router;
