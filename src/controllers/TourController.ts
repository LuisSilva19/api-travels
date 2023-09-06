import { Request, Response } from "express";
import {TourModel} from "../models/TourModel";

class TourController {
    static createTour = async (req: Request, res: Response) => {
        const data = {
            travel_id : req.params.id,
            ...req.body
          };
          const tour = await TourModel.create(data);
          return res.status(201).json(tour);
    }
}

export default TourController;