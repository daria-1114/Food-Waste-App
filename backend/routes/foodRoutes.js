import express from "express";
import { createFood, getFoods } from "../controllers/foodController.js";

const router = express.Router();

router.post("/", createFood);
router.get("/", getFoods);

export default router;
