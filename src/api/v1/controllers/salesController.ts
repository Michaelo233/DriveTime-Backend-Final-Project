import { Request, Response, NextFunction } from "express";
import * as salesService from "../services/salesServices";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

// handles GET request to read all sales in collection
export const getAllSalesHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const sales = await salesService.getAllSales();

        res.status(HTTP_STATUS.OK).json(successResponse({"count": sales.length, sales}, "Sales retrieved successfully"));
    } catch (error: unknown) {
        next(error);
    }
};