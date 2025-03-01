import express from "express";
import cors from "cors";
import itineraryRoutes from "./routes/itinerary-routes";

const app = express();

app.use(express.json());
app.use(cors());

app.use('/itinerary', itineraryRoutes);

export default app;