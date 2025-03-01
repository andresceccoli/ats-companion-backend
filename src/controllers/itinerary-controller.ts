import { Request, Response } from "express";
import itineraryService from "../service/itinerary-service.js";
import { ItineraryRequest } from "../model/itinerary-request.js";

const create = (req: Request, res: Response) => {
    itineraryService.createItinerary(req.body as ItineraryRequest).then(id => {
        res.send(`Itinerary created successfully with id ${id}`);
    }).catch(error => {
        console.error('Error creating itinerary', error);
        res.status(400).json({
            message: error.message
        });
    });
}

const find = (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        res.status(404).json({
            message: "Itinerary not found"
        });
    } else {
        itineraryService.findItinerary(id).then(itinerary => {
            res.json(itinerary);
        }).catch(error => {
            console.error('Error finding itinerary', error);
            res.status(500).json({
                message: error.message
            });
        });
    }
};

export default {
    create,
    find
};