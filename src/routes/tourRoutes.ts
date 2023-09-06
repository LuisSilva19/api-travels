import express from "express";
import TourController from "../controllers/TourController";

const router = express.Router();

router.post("/tour", TourController.createTour);

export default router;


