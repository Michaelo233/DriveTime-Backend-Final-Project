import { Request, Response, NextFunction } from "express";
import * as carService from "../services/carServices";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

// handles POST request to create new car
export const createCarHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const {model, brand, year, price, color} = req.body;
        const carData = {model, brand, year, price, color};

        const newCar = await carService.createCar(carData);

        res.status(HTTP_STATUS.OK).json(successResponse({newCar}, "Car created successfully"));
    } catch (error: unknown) {
        next(error);
    }
};