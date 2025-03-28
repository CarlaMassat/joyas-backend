import { Router } from "express";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../controllers/categoryController";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/productController";
import { createService, getServices } from '../controllers/serviceController';
import { createBanner, getBanners } from '../controllers/bannerController';
import { createReview, getReviews } from '../controllers/reviewController';

const router = Router()

router.post('/categories', createCategory)
router.put('/categories/:id', updateCategory)
router.delete('/categories/:id', deleteCategory)
router.get('/categories', getCategories)

router.post('/products', createProduct)
router.put('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)
router.get('/products', getProducts)

router.post('/services', createService)
router.get('/services', getServices )

router.post('/banners', createBanner)
router.get('/banners', getBanners )

router.post('/reviews', createReview)
router.get('/reviews', getReviews )

export default router