"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategories = exports.createCategory = void 0;
const Category_1 = __importDefault(require("../models/Category"));
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const existingCategory = await Category_1.default.findOne({ name });
        if (existingCategory)
            return res.status(400).json({ message: "La categoría ya existe" });
        const newCategory = new Category_1.default({ name });
        await newCategory.save();
        return res
            .status(201)
            .json({ message: "Categoria creada", category: newCategory });
    }
    catch (error) {
        return res.status(500).json({ message: "Error en el servidor" });
    }
};
exports.createCategory = createCategory;
const getCategories = async (req, res) => {
    try {
        const categories = await Category_1.default.find();
        return res.status(200).json(categories);
    }
    catch (error) {
        return res.status(500).json({ message: "Error al obtener las categorías" });
    }
};
exports.getCategories = getCategories;
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const category = await Category_1.default.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Categoria no encontrada" });
        }
        const existingCategory = await Category_1.default.findOne({ name });
        if (existingCategory && existingCategory._id.toString() !== id) {
            return res
                .status(400)
                .json({ message: "Ya existe una categoria con ese nombre" });
        }
        category.name = name || category.name;
        await category.save();
        return res.status(200).json({ message: "Categoria actualizada", category });
    }
    catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error });
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category_1.default.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ message: "Categoria no encontrada" });
        }
        return res.status(200).json({ message: "Categoria eliminada", category });
    }
    catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error });
    }
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=categoryController.js.map