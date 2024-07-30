import express from "express";
import { registerSeller, loginSeller } from "../controller";

const router = express.Router()

router.post('/register', registerSeller)
router.post('/login', loginSeller)

export default router