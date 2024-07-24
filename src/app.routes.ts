import express from 'express'
import sellerRoutes from './modules/seller/routes/index'

const router = express.Router()

router.use('/seller', sellerRoutes)

export default router