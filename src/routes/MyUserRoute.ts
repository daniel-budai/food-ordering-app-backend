import express from "express";
import MyUserController from "../controllers/MyUserControllers"; // Import the MyUserController module using default import syntax

const router = express.Router();

router.post("/", MyUserController.createCurrentUser);

export default router;
