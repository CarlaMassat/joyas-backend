"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProducts = exports.createProduct = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const AdminCategory_1 = __importDefault(require("../models/AdminCategory"));
const createProduct = async (req, res) => {
    try {
        const { name, category, description, price, stock, image } = req.body;
        const existingCategory = await AdminCategory_1.default.findById(category);
        if (!existingCategory) {
            return res.status(400).json({ message: 'La categoria no existe' });
        }
        const newProduct = new Product_1.default({
            name,
            category: existingCategory._id,
            description,
            price,
            stock,
            image,
        });
        await newProduct.save();
        const categoryProduct = await Product_1.default.findById(newProduct._id).populate('category', 'name -_id');
        return res
            .status(201)
            .json({ message: 'Producto creado', product: categoryProduct });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error en el servidor', error });
    }
};
exports.createProduct = createProduct;
const getProducts = async (req, res) => {
    try {
        const products = await Product_1.default.find().populate("category", "name -_id");
        return res.status(200).json({ products });
    }
    catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error });
    }
};
exports.getProducts = getProducts;
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, description, price, stock, image } = req.body;
        const product = await Product_1.default.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        if (category) {
            const existingCategory = await AdminCategory_1.default.findById(category);
            if (!existingCategory) {
                return res.status(400).json({ message: "La categoría no existe" });
            }
            product.category = existingCategory._id;
        }
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.stock = stock || product.stock;
        product.image = image || product.image;
        await product.save();
        const updatedProduct = await Product_1.default.findById(id).populate("category", "name -_id");
        return res.status(200).json({ message: "Producto actualizado", product: updatedProduct });
    }
    catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product_1.default.findByIdAndDelete(id).populate("category", "name -_id");
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        return res.status(200).json({ message: "Producto eliminado", product });
    }
    catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error });
    }
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=productController.js.map