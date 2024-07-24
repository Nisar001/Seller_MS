import express from 'express'
import { CreateProduct, getProduct, updateProduct, getAllProducts, getProductsByCategory } from "../controller";

const router = express.Router()


router.use()
router.post('/add-product', CreateProduct)
router.get('/product/:productId', getProduct)
router.patch('/update-product-details/:productId', updateProduct)
router.get('/get-all-products/:sellerId', getAllProducts)
router.get('/get-all-products/:sellerId/category/:categoryId', getProductsByCategory)

export default router