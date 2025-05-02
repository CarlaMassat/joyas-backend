"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdmindeleteCategory = exports.AdminupdateCategory = exports.AdmingetCategories = exports.AdmincreateCategory = void 0;
const AdminCategory_1 = __importDefault(require("../models/AdminCategory"));
const AdmincreateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const existingCategory = await AdminCategory_1.default.findOne({ name });
        if (existingCategory)
            return res.status(400).json({ message: "La categoría ya existe" });
        const newCategory = new AdminCategory_1.default({ name });
        await newCategory.save();
        return res
            .status(201)
            .json({ message: "Categoria creada", category: newCategory });
    }
    catch (error) {
        return res.status(500).json({ message: "Error en el servidor" });
    }
};
exports.AdmincreateCategory = AdmincreateCategory;
const AdmingetCategories = async (req, res) => {
    try {
        const categories = await AdminCategory_1.default.find();
        return res.status(200).json(categories);
    }
    catch (error) {
        return res.status(500).json({ message: "Error al obtener las categorías" });
    }
};
exports.AdmingetCategories = AdmingetCategories;
const AdminupdateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const category = await AdminCategory_1.default.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Categoria no encontrada" });
        }
        const existingCategory = await AdminCategory_1.default.findOne({ name });
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
exports.AdminupdateCategory = AdminupdateCategory;
const AdmindeleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await AdminCategory_1.default.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ message: "Categoria no encontrada" });
        }
        return res.status(200).json({ message: "Categoria eliminada", category });
    }
    catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error });
    }
};
exports.AdmindeleteCategory = AdmindeleteCategory;
//# sourceMappingURL=adminCategoryController.js.map