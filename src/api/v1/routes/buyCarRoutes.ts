import express from "express";
import { validateRequest } from "../middleWare/validate";
import * as buyCarController  from "../controllers/buyCarController";
import { buyCarSchemas } from "../validation/buyCarShemas";

const buyCarRouter = express.Router();

buyCarRouter.post("/buy-cars", validateRequest(buyCarSchemas.create), buyCarController.createBuyCarHandler);

export default buyCarRouter;