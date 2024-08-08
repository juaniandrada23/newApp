import Product from '../models/productsModel.js';

const getAllProducts = (req, res) => {
    Product.findAllProducts((err, products) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(products);
        }
    });
};

const getProductById = (req, res) => {
    const productId = req.params.id;
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

const addProduct = (req, res) => {
    Product.addNewProduct(req.body, (err, products) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(products);
        }
    });
};

const deleteProduct = (req, res) => {
    const productId = req.params.id;
    Product.removeProduct(productId, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            if (result.affectedRows > 0) {
                res.status(200).json({ message: 'Producto borrado con éxito' });
            } else {
                res.status(404).json({ message: 'Producto no encontrado' });
            }
        }
    });
};

const filterProducts = (req, res) => {
    const filters = {
        name: req.query.name,
        minPrice: parseFloat(req.query.minPrice),
        maxPrice: parseFloat(req.query.maxPrice),
        sortOrder: req.query.sortOrder,
    };

    Product.findFilteredProducts(filters, (err, products) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(products);
        }
    });
};

export default {
    getAllProducts,
    getProductById,
    addProduct,
    deleteProduct,
    filterProducts
};
