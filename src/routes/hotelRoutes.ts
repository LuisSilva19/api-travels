import express from "express";
import HotelController from "../controllers/HotelController";

const router = express.Router();

router.get("/hotels", HotelController.findEverythingWithoutParanoid);

export default router;