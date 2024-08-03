import express from "express";
import multer from "multer";
import MyRestaurantControlller from "../controllers/MyRestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1025 }, // 5MB
});

router.get(
  "/order",
  jwtCheck,
  jwtParse,
  MyRestaurantControlller.getMyRestaurant
);

router.patch(
  "/order/:orderId/status",
  jwtCheck,
  jwtParse,
  MyRestaurantControlller.updateOrderStatus
);

router.get(
  "/",
  jwtCheck,
  jwtParse,
  MyRestaurantControlller.getMyRestaurantOrders
);

router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  MyRestaurantControlller.createMyRestaurant
);

router.put(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  MyRestaurantControlller.updateMyRestaurant
);

export default router;
