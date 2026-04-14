import express from "express";
import { validateRequest } from "../middleWare/validate";
import * as buyCarController  from "../controllers/buyCarController";
import { buyCarSchemas } from "../validation/buyCarShemas";

const buyCarRouter = express.Router();

//API Doc 2: POST endpoint with request body
/**
 * @openapi
 * /buy-cars:
 *   post:
 *     summary: Buy a car
 *     tags: [Car Purchases]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerName
 *               - customerEmail
 *               - paymentMethod
 *               - carId
 *               - totalPrice
 *             properties:
 *               customerName:
 *                 type: string
 *                 example: "John Doe"
 *               customerEmail:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               paymentMethod:
 *                 type: string
 *                 example: "Credit Card"
 *               carId:
 *                 type: string
 *                 example: "RRC Event"
 *               totalPrice:
 *                 type: number
 *                 example: 25000
 *     responses:
 *       '201':
 *         description: Car purchased successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
buyCarRouter.post("/buy-cars", validateRequest(buyCarSchemas.create), buyCarController.createBuyCarHandler);

export default buyCarRouter;