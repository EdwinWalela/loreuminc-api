import express from "express"
import controller from "../controllers/users"

const router = express.Router()

router.get('/',controller.getAllUsers)
router.get('/:id',controller.getUserById)

export default router