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

// to get all cars in a collection 
export const getAllCars = async (): Promise<Car[]> => {
    try {
        // const event = await firestoreRepository.createDocument<Event>(COLLECTION, newEventData);
        const cars = await firestoreRepository.getAllDocuments<Car>(COLLECTION);

        return cars;

    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to retrieve all cars: ${errorMessage}`
        );
    }
};

// to find an existing car by id
export const getCarById = async (id: string): Promise<Car> => {
    try {
        const car = await firestoreRepository.getDocById<Car>(COLLECTION, id);

        if(!car){
            throw new Error("Car not found");
        } else {
            return car;
        }


    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to retrieve the car: ${errorMessage}`
        );
    }
};

// updating an existing car - userId or content
export const updateCar = async (id: string, 
    carData:{
        model?: string,
        brand?: string,
        year?: number,
        price?: string,
        color?: string,
        status?: string,
    }): Promise<Car | null> => {
    try {
        const updateCarData: Partial<Car> = {};
        
        if(carData.model != undefined) {
            updateCarData.model = carData.model;
        }

        if(carData.year != undefined) {
            updateCarData.year = carData.year;
        }

        if(carData.price != undefined) {
            updateCarData.price = carData.price;
        }

        if(carData.color != undefined) {
            updateCarData.color = carData.color;
        }

        if(carData.status != undefined) {
            updateCarData.status = carData.status;
        }

        if(Object.keys(updateCarData).length === 0){
            throw new Error("no fields provied to updated");
        }        
        
        updateCarData.updatedAt = new Date().toISOString(); 

        await firestoreRepository.updateDocument(COLLECTION, id, updateCarData);

        const updatedCar = await firestoreRepository.getDocById<Car>(COLLECTION, id);

        if(!updatedCar){
            throw new Error("Updated car not found");
        }

        return updatedCar;
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to update the car: ${errorMessage}`
        );
    }
};

// deleteing an existing car 
export const deleteCar = async (id: string): Promise <void> => {
    try {
        await firestoreRepository.deleteDocument(COLLECTION, id);

    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to delete the car: ${errorMessage}`
        );
    }
};

// filter cars by model or color
export const filterCars = async (filter: {model?: string, color?: string}, brand?: string): Promise<Car[]> => {
    try {
        const cars = await firestoreRepository.getAllDocuments<Car>(COLLECTION);
        
        const filteredCars = cars.filter(car => {
            let matches = true;
            if (filter.model && car.model !== filter.model) {
                matches = false;
            }
            if (filter.color && car.color !== filter.color) {
                matches = false;
            }
            if (brand && car.brand !== brand) {
                matches = false;
            }
            return matches;
        });
        if (filteredCars.length === 0) {
            throw new Error("No cars found with the provided filters");
        }
        
        return filteredCars;
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to filter cars: ${errorMessage}`
        );
    }
};
