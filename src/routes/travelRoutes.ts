import express from "express";
import TravelController from "../controllers/TravelControllers";

const router = express.Router();

router.get("/travel", TravelController.findTravel);
router.post("/travel", TravelController.createTravel);

export default router;