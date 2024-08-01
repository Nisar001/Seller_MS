import express from 'express'
import {
   createBundleProductSale,
   getBundleProductSale,
   getAllBundleProductSale,
   updateBundleProductSale,
   deleteBundleProductSale
} from '../controllers'


const router = express.Router()

router.post('/add-bundle', createBundleProductSale)
router.get('/get-bundle', getBundleProductSale)
router.get('/get-all-bundle', getAllBundleProductSale)
router.patch('/update-bundle', updateBundleProductSale)
router.delete('/delete-bundle', deleteBundleProductSale)

export default router