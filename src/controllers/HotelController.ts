import { Request, Response } from "express";
import { errorLogger, logger } from "../configs/logger";
import HotelModel from "../models/HotelModel";

class HotelController {
    static findAllWithParanoid = async (req: Request, res: Response) => {
        const hotels = await HotelModel.findAll({ where: { deletedAt: null } });
        logger.info(hotels);

        if (!hotels) {
            errorLogger.error("Note with that ID not found");
            return res.status(404).json({
              status: "fail",
              message: "Hotel not found",
            });
          }

        res.status(201).json({
            status: "success",
            data: { hotels },
        });
    }

    static findEverythingWithoutParanoid = async (req: Request, res: Response) => {
        const hotels = await HotelModel.findAll({ paranoid: false });

        HotelModel.scope("todos").findAll()
        logger.info(hotels);

        if (!hotels) {
            errorLogger.error("Note with that ID not found");
            return res.status(404).json({
              status: "fail",
              message: "Hotel not found",
            });
          }

        res.status(201).json({
            status: "success",
            data: { hotels },
        });
    }

    static findAllWithoutScope = async (req: Request, res: Response) => {
        const hotels = await HotelModel.unscoped().findAll({ where: { deletedAt: null } });
        logger.info(hotels);

        if (!hotels) {
            errorLogger.error("Note with that ID not found");
            return res.status(404).json({
              status: "fail",
              message: "Hotel not found",
            });
          }

        res.status(201).json({
            status: "success",
            data: { hotels },
        });
    }

}
export default HotelController;