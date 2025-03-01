import { StateCode } from "./state-code";

export interface ItineraryItemRequest {
    id: string;
    itemType: ("road" | "poi")
}

export interface ItineraryRequest {
    id: string;
    startCity?: string;
    endCity?: string;
    endPlace?: string;
    items: ItineraryItemRequest[];
}

export enum TurnDirection { Left = "left", Right = "right", Ahead = "ahead" };
export enum RoadType { I = "interstate", US = "us", St = "state", Rd = "street" };
export enum CardinalDirection { West = "w", North = "n", East = "e", South = "s" };

export interface RoadItemRequest extends ItineraryItemRequest {
    itemType: "road";
    roadName: string;
    turnDirection: TurnDirection;
    roadType: RoadType;
    stateCode?: StateCode;
    cardinalDirections: CardinalDirection[];
    exitCode?: string;
}

export enum PoiType { Viewpoint = "viewpoint", Photo = "photo", Place = "place", City = "city", Details = "details" };
export enum PoiSide { Left = "left", Right = "right" };

export interface PoiItemRequest extends ItineraryItemRequest {
    itemType: "poi";
    poiType: PoiType;
    poiSide?: PoiSide;
    poiText: string;
}