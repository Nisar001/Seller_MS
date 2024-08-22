import express from 'express'
import {
   addProduct,
   updateProduct,
   getAllCategory,
   getProduct,
   getAllProduct,
   deleteProduct,
   getCategory
} from '../controllers'

const router = express.Router()

router.post('/add-product', addProduct)
router.patch('/update-product', updateProduct)
router.get('/get-product', getProduct)
router.get('/get-all-products', getAllProduct)
router.get('/get-all-category', getAllCategory)
router.delete('/delete', deleteProduct)
router.get('/get-category', getCategory)

export default router