import express from 'express'
const router = express.Router()
import { transfer } from "../controller/transactions.js";

router.use(express.json())

router.post('/transfer', transfer)

export default router