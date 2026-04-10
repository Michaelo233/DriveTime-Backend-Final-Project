import express from "express";
import { validateRequest } from "../middleWare/validate";
import * as carController from "../controllers/carControllers";
import { carSchemas } from "../validation/carSchemas";

const router = express.Router();

router.post("/", validateRequest(carSchemas.create), carController.createCarHandler);