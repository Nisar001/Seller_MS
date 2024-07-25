import express from 'express'
import {
   CreateProduct,
   getProduct,
   updateProduct,
   getAllProducts,
   getProductsByCategory,
   deleteProductById,
   addDiscountOnProduct,
   updateDiscountOnProduct,
   deleteDiscountOnProduct
} from "../controller";

const router = express.Router()


// router.use()
router.post('/add-product', CreateProduct)
router.get('/product/:productId', getProduct)
router.patch('/update-product-details/:productId', updateProduct)
router.get('/get-all-products/:sellerId', getAllProducts)
router.get('/get-all-products/:sellerId/category/:categoryId', getProductsByCategory)
router.delete('/delete-product/:productId', deleteProductById)
router.post('/add-discount/:productId', addDiscountOnProduct)
router.patch('/update-discount/:discountId', updateDiscountOnProduct)
router.delete('/delete-discount/:discountId', deleteDiscountOnProduct)

export default router