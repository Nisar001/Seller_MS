import express from 'express'
import { createStore } from '../controller'

const router = express.Router()

router.post('/create', createStore)

export default router