import { Document, model, Schema } from "mongoose";

export interface TimestampDocument extends Document {
    createdAt: Date;
    updatedAt: Date;
}

export interface IItinerary extends TimestampDocument {
    routeId: string;
    startCity?: string;
    endCity?: string;
    endPlace?: string;
    createdAt: Date;
}

const itinerarySchema = new Schema<IItinerary>({
    routeId: { type: String, required: true, unique: true },
    startCity: String,
    endCity: String,
    endPlace: String,
    updatedAt: { type: Date, expires: 24*60*60 }
}, { timestamps: true });

const Itinerary = model<IItinerary>('Itinerary', itinerarySchema);

export default Itinerary;