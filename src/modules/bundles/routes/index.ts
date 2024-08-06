import express from 'express'
import {
   addBundle,
   getBundle,
   getAllBundle,
   updateBundle,
   deleteBundle,
   removeProductFromBundle
} from '../controllers'


const router = express.Router()

router.post('/add-bundle', addBundle)
router.get('/get-bundle', getBundle)
router.get('/get-all-bundle', getAllBundle)
router.patch('/update-bundle', updateBundle)
router.delete('/delete-bundle', deleteBundle)
router.patch('/remove-product', removeProductFromBundle)


export default router