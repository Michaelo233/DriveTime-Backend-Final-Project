import { Sales } from "../models/buyCarModel";
import * as firestoreRepository from "../repositories/firestoreRepository";
// import { eventSchemas } from "../validation/eventSchemas";
// import { validateRequest } from "../middleWare/validate";

const SALESCOLLECTION = "Sales";

// to get all sales in a collection 
export const getAllSales = async (): Promise<Sales[]> => {
    try {
        // const event = await firestoreRepository.createDocument<Event>(COLLECTION, newEventData);
        const sales = await firestoreRepository.getAllDocuments<Sales>(SALESCOLLECTION);

        return sales;

    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to retrieve all sales: ${errorMessage}`
        );
    }
};