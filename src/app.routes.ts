import express from 'express'
import sellerRoutes from './modules/routes'
import productRoutes from './modules/product/routes'
import bundleRoutes from './modules/bundles/routes'
import discountRoutes from './modules/discount/routes'
import storeRoutes from './modules/store/routes'
import { verify_token } from './middlewares/verifyJWT'

const router = express.Router()

// seller route
router.use('/seller', sellerRoutes)

router.use(verify_token)
router.use('/seller/store', storeRoutes)
router.use('/seller/product', productRoutes)
router.use('/seller/discount', discountRoutes)
router.use('/seller/bundle', bundleRoutes)

export default router