import express from 'express'
import { createStore, deleteStore, getStoreById, updateStore } from '../controller'

const router = express.Router()

router.post('/create', createStore)
router.patch('/update', updateStore)
router.delete('/delete', deleteStore)
router.get('/get-store', getStoreById)

export default router