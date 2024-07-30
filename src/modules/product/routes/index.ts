import express from 'express'
import {
   CreateProduct,
   updateProduct,
   getAllProducts,
   getProduct,
   getProductsByCategory,
   deleteProductById
} from '../controllers'

const router = express.Router()

router.post('/add-product', CreateProduct)
router.patch('/update-product/:productId', updateProduct)
router.get('/get-product/:productId', getProduct)
router.get('/get-all-product/:sellerId', getAllProducts)
router.get('/get-all-products/:sellerId/category/:categoryId', getProductsByCategory)
router.delete('/delete-product/:productId', deleteProductById)

export default router