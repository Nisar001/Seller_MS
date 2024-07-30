import express from 'express'
import {
   addDiscountOnProduct,
   getAllDiscount,
   getDiscount,
   updateDiscountOnProduct,
   deleteDiscountOnProduct
} from '../controllers'

const router = express.Router()

router.post('/add-discount/:productId', addDiscountOnProduct)
router.get('/:selletId/get-dicount/:discountId', getDiscount)
router.get('/get-all-discount/:sellerId', getAllDiscount)
router.patch('/update-discount/:discountId', updateDiscountOnProduct)
router.delete('/delete-discount/:discountId', deleteDiscountOnProduct)

export default router