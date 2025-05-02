import { Request, Response } from "express";
import AdminCategory from "../models/AdminCategory";

export const AdmincreateCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name } = req.body;
    const existingCategory = await AdminCategory.findOne({ name });

    if (existingCategory)
      return res.status(400).json({ message: "La categoría ya existe" });

    const newCategory = new AdminCategory({ name });
    await newCategory.save();

    return res
      .status(201)
      .json({ message: "Categoria creada", category: newCategory });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const AdmingetCategories = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const categories = await AdminCategory.find();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener las categorías" });
  }
};

export const AdminupdateCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await AdminCategory.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Categoria no encontrada" });
    }

    const existingCategory = await AdminCategory.findOne({ name });

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

export const AdmindeleteCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const category = await AdminCategory.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: "Categoria no encontrada" });
    }

    return res.status(200).json({ message: "Categoria eliminada", category });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor", error });
  }
};
