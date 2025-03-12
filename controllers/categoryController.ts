import { Request, Response } from "express";
import Category from "../models/Category";

export const createCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name } = req.body;
    const existingCategory = await Category.findOne({ name });

    if (existingCategory)
      return res.status(400).json({ message: "La categoría ya existe" });

    const newCategory = new Category({ name });
    await newCategory.save();

    return res
      .status(201)
      .json({ message: "Categoria creada", category: newCategory });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const getCategories = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener las categorías" });
  }
};

export const updateCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Categoria no encontrada" });
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory && existingCategory._id.toString() !== id) {
      return res
        .status(400)
        .json({ message: "Ya existe una categoria con ese nombre" });
    }

    category.name = name || category.name;
    await category.save();

    return res.status(200).json({ message: "Categoria actualizada", category });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor", error });
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: "Categoria no encontrada" });
    }

    return res.status(200).json({ message: "Categoria eliminada", category });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor", error });
  }
};

