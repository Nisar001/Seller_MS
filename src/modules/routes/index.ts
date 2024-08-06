import express from "express";
import { registerSeller, loginSeller, getAllCategory } from "../controller";

const router = express.Router()

router.post('/register', registerSeller)
router.post('/login', loginSeller)
router.get('/get-all-category', getAllCategory)

export default router