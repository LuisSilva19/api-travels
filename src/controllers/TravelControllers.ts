import { Response, Request } from "express";
import Travel from "../models/TravelsModel";
import { errorLogger, logger } from "../configs/logger";
import { TourModel } from "../models/TourModel";
import { TravelDTO } from "../dto/TravelDTO";
import validationBody from "../middleware/validaConstraint";


class TravelController {
    static createTravel = async (req: Request, res: Response) => {    
        const errors = await validationBody(TravelDTO, req);

        if(errors!== null) {
            errorLogger.error(JSON.stringify(errors, null, 2));
            return res.status(400).json(errors);
        }

        const travel = Travel.create(req.body);
        logger.info(travel);
        return res.status(201).json(travel);
        
    };

    static findTravel = async (req: Request, res: Response) => {
        const travels = await Travel.findAll({ include: [TourModel] });
        logger.info(JSON.stringify(travels, null, 2));
        return res.status(200).json(travels);
    }

}

export default TravelController;