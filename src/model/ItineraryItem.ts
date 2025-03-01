import { model, Schema } from "mongoose";
import { StateCode } from "./state-code";
import { TimestampDocument } from "./Itinerary";

export interface IItineraryItem extends TimestampDocument {
    itemType: ("road" | "poi");
    order: number;
    routeId: string;
}

export type TurnDirection = "left" | "right" | "ahead";
export type RoadType = "interstate" | "us" | "state" | "street";
export type CardinalDirection = "w" | "n" | "e" | "s";

export interface IRoadItem extends IItineraryItem {
    itemType: "road";
    roadName: string;
    turnDirection: TurnDirection;
    roadType: RoadType;
    stateCode?: StateCode;
    cardinalDirections: CardinalDirection[];
    exitCode?: string;
}

export type PoiType = "viewpoint" | "photo" | "place" | "city" | "details";
export type PoiSide = "left" | "right";

export interface IPoiItem extends IItineraryItem {
    itemType: "poi";
    poiType: PoiType;
    poiSide?: PoiSide;
    poiText: string;
}

const itineraryItemSchema = new Schema<IItineraryItem>({
    itemType: { type: String, required: true },
    routeId: { type: String, required: true },
    order: { type: Number, required: true },
    updatedAt: { type: Date, expires: 24*60*60 }
}, { timestamps: true, discriminatorKey: "itemType" });

export const ItineraryItem = model<IItineraryItem>('ItineraryItem', itineraryItemSchema);

export const RoadItem = ItineraryItem.discriminator("road",
    new Schema<IRoadItem>({
        roadName: { type: String, required: true },
        turnDirection: { type: String, required: true },
        roadType: { type: String, required: true },
        stateCode: String,
        cardinalDirections: [String],
        exitCode: String
    }, { discriminatorKey: "itemType" }));

export const PoiItem = ItineraryItem.discriminator("poi",
    new Schema<IPoiItem>({
        poiType: { type: String, required: true },
        poiSide: String,
        poiText: String
    }, { discriminatorKey: "itemType" }));

