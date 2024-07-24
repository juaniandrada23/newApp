import Client from '../models/clientModel.js';

const getMyOrders = (req, res) => {
    const clientId = req.params.user_id; 
    Client.findOrdersById(clientId, (err, order) => {
        if (err) {
            res.status(500).json({error: err.message});
        } else {
            if (order) {
                res.status(200).json(order);
            } else {
                res.status(404).json({message: 'No posee ordenes u no encontradas!'});
            }
        }
    });
};

export default {
    getMyOrders
};
