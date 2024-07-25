import Order from '../models/orderModel.js';
import Product from '../models/productsModel.js';
import fetch from 'node-fetch';

const handlePaymentNotification = (accessToken) => async (req, res) => {
  const payment = req.query;

  const paymentId = payment.id;

  try {
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (response.ok) {
      const data = await response.json();

      if (data.status === 'approved') {
        const { user_id, shipping_address, comments, items, total } = data.metadata;

        const orderId = await Order.createOrder(user_id, total, shipping_address, "Aprobado", comments);

        for (const item of items) {
          await Product.updateStock(item.id, item.quantity);
          await Order.createOrderDetail(orderId, item.id, item.quantity, item.price);
        }

        res.status(200).json({ message: "Orden creada y stock actualizado" });
      } else {
        res.status(400).json({ message: "Pago no aprobado o datos inválidos" });
      }
    } else {
      res.status(500).json({ error: "Error al obtener la información del pago" });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};

const getMyOrdersDetails = (req, res) => {
  const orderId = req.params.order_id; 
  Order.seeAllOrderDetails(orderId, (err, order) => {
      if (err) {
          res.status(500).json({error: err.message});
      } else {
          if (order) {
              res.status(200).json(order);
          } else {
              res.status(404).json({message: 'No posee detalle de orden!'});
          }
      }
  });
};

export default {
  handlePaymentNotification,
  getMyOrdersDetails
};
