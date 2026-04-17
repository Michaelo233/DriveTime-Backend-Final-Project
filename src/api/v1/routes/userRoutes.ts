import express, { Router } from "express";
import { getUserDetails } from "../controllers/userController";
import authenticate from "../middleWare/authenticate";
import isAuthorized from "../middleWare/authorize";

const userRouter: Router = express.Router();

// Only admins can view detailed user information
userRouter.get(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin"] }),
    getUserDetails
);

export default userRouter;