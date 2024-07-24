import Product from '../models/productsModel.js';

const getAllProducts = (req, res) => {
    // Usar el método findAllProducts del modelo Product para obtener todos los productos
    Product.findAllProducts((err, products) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(products);
        }
    });
};

const getProductById = (req, res) => {
    const productId = req.params.id; // Obtener el ID del producto desde los parámetros de la ruta
    Product.findProductById(productId, (err, product) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: 'Producto no encontrado' });
            }
        }
    });
};

export default {
    getAllProducts,
    getProductById
};
