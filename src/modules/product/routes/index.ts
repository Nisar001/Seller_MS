import express from 'express'
import {
   CreateProduct,
   updateProduct,
   getAllProducts,
   getProduct,
   getProductsByCategory,
   deleteProductById,
   availabilityStatus
} from '../controllers'

const router = express.Router()

router.post('/add-product', CreateProduct)
router.patch('/update-product', updateProduct)
router.patch('/available-status', availabilityStatus)
router.get('/get-product', getProduct)
router.get('/get-all-products', getAllProducts)
router.get('/get-all-products-category', getProductsByCategory)
router.delete('/delete', deleteProductById)

export default router