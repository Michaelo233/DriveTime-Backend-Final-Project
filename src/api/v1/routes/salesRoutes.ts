import express from "express";
// import { validateRequest } from "../middleWare/validate";
import * as salesController from "../controllers/salesController";
// import { carSchemas } from "../validation/carSchemas";
import authenticate from "../middleWare/authenticate";
import isAuthorized from "../middleWare/authorize";

const salesRouter = express.Router();

/**
 * @openapi
 * /cars:
 *   get:
 *     summary: Retrieve all cars
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BuyCar'
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

salesRouter.get(
    "/sales", 
    authenticate, 
    isAuthorized({ hasRole: ["admin", "manager", "salesperson"] }), 
    salesController.getAllSalesHandler);

export default salesRouter;