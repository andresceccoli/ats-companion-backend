import mongoose, { Document } from "mongoose";
import Itinerary from "../model/Itinerary";
import { ItineraryItemRequest, ItineraryRequest, PoiItemRequest } from "../model/itinerary-request";
import { ItineraryItem, PoiItem, RoadItem } from "../model/ItineraryItem";

const createItinerary = async (itinerary: ItineraryRequest) => {
    const { id: routeId, startCity, endCity, endPlace, items } = itinerary;
    const doc = { routeId, startCity, endCity, endPlace };

    validateItems(items);

    const session = await mongoose.startSession();
    const saved = await session.withTransaction(async () => {
        const it = new Itinerary(doc);
        const saved = await it.save({ session });
    
        const promises = items.map((i, order) => {
            const { id, ...itemReq } = i;
            const itemDoc = { ...itemReq, order, routeId };
            switch (itemDoc.itemType) {
                case "road":
                    return new RoadItem(itemDoc).save({ session });
                case "poi":
                    return new PoiItem(itemDoc).save({ session });
                default:
                    break;
            }
        });
        await Promise.all(promises);

        return saved._id;
    });

    await session.commitTransaction();
    await session.endSession();

    return saved ? (saved as Document)._id : null;
};

const validateItems = (items: ItineraryItemRequest[]) => {
    if (!items) {
        throw new Error("Itinerary contains no items");
    }
    const pois = items.filter(i => i.itemType === "poi");
    for (let i = 0; i < pois.length; i++) {
        const poi = pois[i] as PoiItemRequest;
        if (poi.poiType !== "city" && poi.poiType !== "details" && !poi.poiSide) {
            throw new Error(`Side property is required for point ${poi.poiText} of type ${poi.poiType}`);
        }
    }
};

const findItinerary = async (id: string) => {
    const itinerary = await Itinerary.findOne({ routeId: id }).lean();
    if (!itinerary) {
        return;
    }

    const { _id, __v, routeId, ...rest } = itinerary;
    const result: ItineraryRequest = { id: routeId, items: [], ...rest };
    
    const items = await ItineraryItem.find({ routeId: id }).sort("order").lean();
    const resultItems = items.map(i => {
        const { _id, __v, routeId, order, ...rest } = i;
        return ({
            id: routeId,
            ...rest
        });
    });
    result.items = resultItems;

    return result;
};

export default {
    createItinerary,
    findItinerary
};