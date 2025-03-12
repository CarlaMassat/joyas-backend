import { Router } from "express";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../controllers/categoryController";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/productController";

const router = Router()

router.post('/categories', createCategory)
router.put('/categories/:id', updateCategory)
router.delete('/categories/:id', deleteCategory)
router.get('/categories', getCategories)



router.post('/products', createProduct)
router.put('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)
router.get('/products', getProducts)

export default router