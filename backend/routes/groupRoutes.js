import express from "express";
import { createGroup, addUserToGroup, getGroupMembers } from "../controllers/groupController.js";

const router = express.Router();

router.post("/", createGroup);
router.post("/add-user", addUserToGroup);
router.get("/:groupId/members", getGroupMembers);

export default router;
