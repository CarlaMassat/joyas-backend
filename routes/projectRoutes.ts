import { Router } from "express";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../controllers/categoryController";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/productController";
import { createService, getServices } from '../controllers/serviceController';
import { createBanner, getBanners } from '../controllers/bannerController';
import { createReview, getReviews } from '../controllers/reviewController';
import { authenticate } from '../middleware/auth';
import { createCard, getCards } from '../controllers/cardController';
import { AdmincreateCategory, AdmindeleteCategory, AdmingetCategories, AdminupdateCategory } from '../controllers/adminCategoryController';

const router = Router()

router.get('/services', getServices)
router.get('/banners', getBanners)
router.get('/reviews', getReviews)
router.get('/categories',getCategories)

router.use(authenticate)

router.post('/categories', createCategory)
router.put('/categories/:id', updateCategory)
router.delete('/categories/:id', deleteCategory)

router.post('/admin-categories', AdmincreateCategory)
router.get('/admin-categories', AdmingetCategories)
router.put('/admin-categories/:id', AdminupdateCategory)
router.delete('/admin-categories/:id', AdmindeleteCategory)

router.post('/products', createProduct)
router.put('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)
router.get('/products', getProducts)

router.post('/services', createService)


router.post('/banners', createBanner)


router.post('/reviews', createReview)

router.post('/cards', createCard)
router.get('/cards', getCards)

export default router