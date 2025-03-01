import express from "express";
import itineraryController from "../controllers/itinerary-controller";

const router = express.Router();

router.post("/", itineraryController.create);
router.get("/:id", itineraryController.find);

export default router;