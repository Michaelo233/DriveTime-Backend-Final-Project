import { Car } from "../models/carModel";
import * as firestoreRepository from "../repositories/firestoreRepository";
// import { eventSchemas } from "../validation/eventSchemas";
// import { validateRequest } from "../middleWare/validate";

const COLLECTION = "Cars";

// creating new car 
export const createCar = async (
    carData: {
        model: string,
        brand: string,
        year: number,
        price: string,
        color: string,
    }): Promise<Car> => {
    try {

        const cars = await firestoreRepository.getAllDocuments<Car>(COLLECTION)
        const newCarData = {
            carId: (carData.model) + carData.year.toString() + carData.color,
            model: carData.model.charAt(0).toUpperCase() + carData.model.slice(1).toLowerCase(),
            brand: carData.brand.charAt(0).toUpperCase() + carData.brand.slice(1).toLowerCase(),
            year: carData.year,
            price: `$${parseFloat(carData.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`,
            color: carData.color.charAt(0).toUpperCase() + carData.color.slice(1).toLowerCase(),
            status: "available",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        // Check if carId already exists
        const carExists = cars.some(car => car.carId === newCarData.carId);
        if (carExists) {
            throw new Error("car already exist in collection");
        }
        
        const id = await firestoreRepository.createDocument<Car>(COLLECTION, newCarData.carId, newCarData);
        
        return {id, ... newCarData} as Car;
        
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to create car: ${errorMessage}`
        );
    }
};