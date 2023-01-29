import express from "express"
import controller from "../controllers/users"

const router = express.Router()

router.get('/',controller.getAllUsers)

export default router