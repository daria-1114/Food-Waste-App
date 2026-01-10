import express from "express";
import { createUser, getUser, getUserGroups } from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUser);
router.get("/:userId/groups",getUserGroups);
export default router;
