
import { Request, Response } from "express";
import Product from "../models/Product";
import AdminCategory from "../models/AdminCategory";

export const createProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name, category, description, price, stock, image, createdAt } = req.body;

    const existingCategory = await AdminCategory.findById(category);

    if (!existingCategory) {
      return res.status(400).json({ message: 'La categoria no existe' });
    }

    const newProduct = new Product({
      name,
      category: existingCategory._id,
      description,
      price,
      stock,
      image,
      createdAt: createdAt ? new Date(createdAt) : new Date(),
    });

    await newProduct.save();

    const categoryProduct = await Product.findById(newProduct._id).populate(
      'category',
      'name -_id'
    );

    return res
      .status(201)
      .json({ message: 'Producto creado', product: categoryProduct });
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor', error });
  }
};


export const getProducts = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const products = await Product.find().populate("category", "name -_id");

    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor", error });
  }
};

export const updateProduct = async (req: Request, res: Response ): Promise<any> => {
try {
  const {id} = req.params;
  const { name, category, description, price, stock, image } = req.body;
  
  const product = await Product.findById(id)
  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  if (category) {
    const existingCategory = await AdminCategory.findById(category);
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
    
    const updatedProduct = await Product.findById(id).populate("category", "name -_id");
    
    return res.status(200).json({ message: "Producto actualizado", product: updatedProduct });

} catch (error) {
  return res.status(500).json({ message: "Error en el servidor", error });
}

}

export const deleteProduct = async (req: Request, res: Response): Promise<any> => {
  try {

    const {id} = req.params;

    const product = await Product.findByIdAndDelete(id).populate("category", "name -_id");

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.status(200).json({ message: "Producto eliminado", product });
    
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor", error });
  }
}
