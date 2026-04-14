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

// handles GET request to read all cars in collection
export const getAllCarsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const cars = await carService.getAllCars();

        res.status(HTTP_STATUS.OK).json(successResponse({"count": cars.length, cars}, "Cars retrieved successfully"));
    } catch (error: unknown) {
        next(error);
    }
};

// handles GET request to read a single car by ID
export const getCarByIdHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;

        const car = await carService.getCarById(id as string);

        res.status(HTTP_STATUS.OK).json(successResponse({car}, "Car retrieved successfully"));
    } catch (error: unknown) {
        next(error);
    }
};

// handles PUT request to update an existing car by ID
export const updateCarHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const {model, brand, year, price, color, status} = req.body;
        const updateData = {model, brand, year, price, color, status};

        const updatedCar = await carService.updateCar(id as string, updateData);

        res.status(HTTP_STATUS.OK).json(successResponse({updatedCar}, "Car updated successfully"));
    } catch (error: unknown) {
        next(error);
    }
};


// handles DELETE request to delete an existing car
export const deleteCarHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        
        await carService.deleteCar(id as string);

        res.status(HTTP_STATUS.OK).json(successResponse({id}, "Car deleted successfully"));
    } catch (error: unknown) {
        next(error);
    }
};