import express from 'express'
import sellerRoutes from './modules/routes'
import productRoutes from './modules/product/routes/index'
import discountRoutes from './modules/discount/routes/index'
import storeRoutes from './modules/store/routes/index'
import { verify_token } from './middlewares/verifyJWT'

const router = express.Router()

// seller route
router.use('/seller', sellerRoutes)

router.use(verify_token)
router.use('/seller/store', storeRoutes)
router.use('/seller/product', productRoutes)
router.use('/seller/discount', discountRoutes)

export default router