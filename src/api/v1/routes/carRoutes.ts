import express from "express";
import { validateRequest } from "../middleWare/validate";
import * as carController from "../controllers/carControllers";
import { carSchemas } from "../validation/carSchemas";

const carRouter = express.Router();

carRouter.post("/cars", validateRequest(carSchemas.create), carController.createCarHandler);

carRouter.get("/cars", carController.getAllCarsHandler);

carRouter.get("/cars/:id", validateRequest(carSchemas.getById), carController.getCarByIdHandler);

carRouter.put("/cars/:id", validateRequest(carSchemas.update), carController.updateCarHandler);

carRouter.delete("/cars/:id", validateRequest(carSchemas.delete), carController.deleteCarHandler);

export default carRouter;