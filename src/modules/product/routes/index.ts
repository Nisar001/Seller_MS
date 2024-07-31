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
router.patch('/update-product', updateProduct)
router.get('/get-product', getProduct)
router.get('/get-all-products', getAllProducts)
router.get('/get-all-products-category', getProductsByCategory)
router.delete('/delete', deleteProductById)

export default router