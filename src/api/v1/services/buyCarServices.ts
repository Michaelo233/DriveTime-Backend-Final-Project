import { Sales } from "../models/buyCarModel";
import { Car } from "../models/carModel";
import * as firestoreRepository from "../repositories/firestoreRepository";
// import { eventSchemas } from "../validation/eventSchemas";
// import { validateRequest } from "../middleWare/validate";

const SALESCOLLECTION = "Sales";
const CARCOLLECTION = "Cars";

// creating new buy car 
export const createBuyCar = async (
    buyCarData: {
        customerName: string,
        customerEmail: string,
        paymentMethod: string,
        carId: string,
        totalPrice: string,
    }): Promise<Sales> => {
    try {
        const cars = await firestoreRepository.getAllDocuments<Car>(CARCOLLECTION)
        
        const formattedTotalPrice = `$${parseFloat(buyCarData.totalPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
        
        for (const car of cars) {
            if (car.carId === buyCarData.carId) {
                if (car.status === "sold") {
                    throw new Error("Car is already sold");
                }
            }
            if (car.carId === buyCarData.carId && car.status === "available" && car.price === formattedTotalPrice) {
                await firestoreRepository.updateDocument<Car>(CARCOLLECTION, car.carId, { ...car, status: "sold", updatedAt: new Date().toISOString() });
            } else if (car.carId === buyCarData.carId && car.status === "available" && car.price !== formattedTotalPrice) {
                throw new Error("Price does not match the car's listed price");
            }
        }


        const newBuyCarData = {
            customerName: buyCarData.customerName,
            customerEmail: buyCarData.customerEmail,
            customerId: (buyCarData.customerName) + buyCarData.carId + new Date().toISOString(),
            paymentMethod: buyCarData.paymentMethod,
            carId: buyCarData.carId,
            purchaseDate: new Date().toISOString(),
            totalPrice: formattedTotalPrice
        };


        const id = await firestoreRepository.createDocument<Sales>(SALESCOLLECTION, newBuyCarData.customerId, newBuyCarData);

        return {id, ... newBuyCarData} as Sales;

    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to create buy car: ${errorMessage}`
        );
    }
};
