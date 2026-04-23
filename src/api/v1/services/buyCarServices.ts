import { Sales } from "../models/buyCarModel";
import { Car } from "../models/carModel";
import * as firestoreRepository from "../repositories/firestoreRepository";
// import { eventSchemas } from "../validation/eventSchemas";
// import { validateRequest } from "../middleWare/validate";
import { sendPurchaseReceipt } from "../utils/mailer";

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
        const cars = await firestoreRepository.getAllDocuments<Car>(CARCOLLECTION);
        
        // 1. Format the input price to match your DB format (e.g., $25,000.00)
        const formattedTotalPrice = `$${parseFloat(buyCarData.totalPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
        
        let foundCar: Car | undefined;

        // 2. Find the car and validate
        for (const car of cars) {
            if (car.carId === buyCarData.carId) {
                foundCar = car; 
                if (car.status === "sold") {
                    throw new Error("Car is already sold");
                }

                if (car.price !== formattedTotalPrice) {
                    throw new Error(`Incorrect Transaction Amount. Expected ${car.price}, received ${formattedTotalPrice}. Please verify the price and try again.`);
                }
                
                await firestoreRepository.updateDocument<Car>(CARCOLLECTION, car.carId, { 
                    ...car, 
                    status: "sold", 
                    updatedAt: new Date().toISOString() 
                });
                break;
            }
        }

        if (!foundCar) {
            throw new Error("Car not found in inventory");
        }

        const newBuyCarData = {
            customerName: buyCarData.customerName,
            customerEmail: buyCarData.customerEmail,
            customerId: buyCarData.customerName.replace(/\s/g, '') + buyCarData.carId + Date.now(),
            paymentMethod: buyCarData.paymentMethod,
            carId: buyCarData.carId,
            purchaseDate: new Date().toISOString(),
            totalPrice: formattedTotalPrice
        };

        const id = await firestoreRepository.createDocument<Sales>(SALESCOLLECTION, newBuyCarData.customerId, newBuyCarData);


        await sendPurchaseReceipt({
            customerName: newBuyCarData.customerName,
            customerEmail: newBuyCarData.customerEmail,
            carName: newBuyCarData.carId,
            carModel: foundCar.model, 
            carColor: foundCar.color, 
            amountPaid: parseFloat(buyCarData.totalPrice)
        });

        return { id, ...newBuyCarData } as Sales;

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Transaction Failed: ${errorMessage}`);
    }
};