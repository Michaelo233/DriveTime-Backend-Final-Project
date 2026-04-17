import express from "express";
import { setCustomClaims } from "../controllers/adminController";
import authenticate from "../middleWare/authenticate";
import isAuthorized from "../middleWare/authorize";

const adminRouter: express.Router = express.Router();

// Only admins can set custom claims
adminRouter.post(
    "/setCustomClaims",
    authenticate,
    isAuthorized({ hasRole: ["admin"] }),
    setCustomClaims
);

export default adminRouter;