import { ServiceAccount } from "firebase-admin/app";
import admin from "firebase-admin";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";

// update with your won firebase private key .json file path
//import * as serviceAccount from "../comp3018-module4-firebase-adminsdk-fbsvc-34a8114031.json";

import serviceAccountJson from "../../drivetime-final-project.json";

const serviceAccount = serviceAccountJson as unknown as admin.ServiceAccount;

// Initialize the Firebase app with the service account credentials
// This step is necessary before you can use any Firebase services
/*
initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
});
*/

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

// Get a reference to the Firestore service
// This creates a Firestore instance that you can use to interact with your database
const db: Firestore = getFirestore();

const auth: Auth = getAuth();

export { db, auth };