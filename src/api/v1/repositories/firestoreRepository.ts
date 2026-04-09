import { db } from "../../../config/firebaseConfig";
// import { FirestoreDataTypes } from "../types/firestore";

// interface FieldValuePair {
//     fieldName: string;
//     fieldValue: FirestoreDataTypes;
// }

// to create a new document
export const createDocument = async <T extends { id: number }>(
    collectionName: string,
    data: T
): Promise<string> => {
    try {
        
        const docId = data.id.toString();
        await db.collection(collectionName).doc(docId).set(data);

        // returns document id for the new post created in the firestore
        return docId;
        
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to create document in ${collectionName}: ${errorMessage}`
        );
    }
};

// to get all documents in a collection
export const getAllDocuments = async <T>(collectionName: string): Promise<T[]> => {
    try {
        const snapshot = await db.collection(collectionName).get();

        // returns document id for the new post created in the firestore
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ... (doc.data() as T)
        }))
        
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to retrieve the documents in ${collectionName}: ${errorMessage}`
        );
    }
};

// to get a single document by ID
export const getDocById = async <T>(collectionName: string, docId: string): Promise<T | null> => {
    try {

        let docRef: FirebaseFirestore.DocumentReference;

        docRef = await db.collection(collectionName).doc(docId);

        /// get() function only reads data from docRef pointer
        const snapshot = await docRef.get();

        if(!snapshot.exists)
            return null;

        return {
            id: snapshot.id,
            ...(snapshot.data() as T),
        };
        
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to retrieve the documents in ${collectionName}: ${errorMessage}`
        );
    }
};

// to update a single document by ID
export const updateDocument = async <T>(collectionName: string, 
    docId: string,
    data: Partial<T>
): Promise<void> => {
    try {

        let docRef: FirebaseFirestore.DocumentReference;

        docRef = await db.collection(collectionName).doc(docId);

        await docRef.update(data);
        
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to update the documents in ${collectionName}: ${errorMessage}`
        );
    }
};


// to delete an existing document
export const deleteDocument = async <T>(collectionName: string, 
    docId: string
): Promise<void> => {
    try {

        await db.collection(collectionName).doc(docId).delete();
        
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to delete the documents in ${collectionName}: ${errorMessage}`
        );
    }
};

