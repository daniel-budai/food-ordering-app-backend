import express from "express";
import MyUserController from "../controllers/MyUserControllers"; // Import the MyUserController module using default import syntax
import { jwtCheck } from "../middleware/Auth";

const router = express.Router();

router.post("/", jwtCheck, MyUserController.createCurrentUser);

export default router;
