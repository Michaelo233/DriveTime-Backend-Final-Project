import express from "express";
// import { validateRequest } from "../middleWare/validate";
import * as salesController from "../controllers/salesController";
// import { carSchemas } from "../validation/carSchemas";
import authenticate from "../middleWare/authenticate";
import isAuthorized from "../middleWare/authorize";

const salesRouter = express.Router();

/**
 * @openapi
 * /sales:
 *   get:
 *     summary: Retrieve all sales
 *     tags: [Sales]
 *     responses:
 *       '200':
 *         description: A list of sales
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sale'
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
    isAuthorized({ hasRole: ["admin", "manager"] }), 
    salesController.getAllSalesHandler);

export default salesRouter;