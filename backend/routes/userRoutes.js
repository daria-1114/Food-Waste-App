import express from "express";
import { register, login, searchUser } from "../controllers/userController.js";
import {protect} from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get(`/search`,protect,searchUser);
export default router;
