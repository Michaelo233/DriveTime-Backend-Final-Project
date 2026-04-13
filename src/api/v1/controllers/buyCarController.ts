import { Request, Response, NextFunction } from "express";
import * as buyCarServices from "../services/buyCarServices";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

// handles POST request to create new buy car
export const createBuyCarHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const {customerName, customerEmail, paymentMethod, carId, totalPrice} = req.body;
        const buyCarData = {customerName, customerEmail, paymentMethod, carId, totalPrice};

        const newBuyCar = await buyCarServices.createBuyCar(buyCarData);

        res.status(HTTP_STATUS.OK).json(successResponse({newBuyCar}, "Buy car created successfully"));
    } catch (error: unknown) {
        next(error);
    }
};