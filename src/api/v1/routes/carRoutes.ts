import express from "express";
import { validateRequest } from "../middleWare/validate";
import * as carController from "../controllers/carControllers";
import { carSchemas } from "../validation/carSchemas";

const carRouter = express.Router();

//API Doc 2: POST endpoint with request body
/**
 * @openapi
 * /cars:
 *   post:
 *     summary: Create a new car item
 *     tags: [Cars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - model
 *               - brand
 *               - year
 *               - price
 *               - color
 *             properties:
 *               model:
 *                 type: string
 *                 example: "Camry"
 *               brand:
 *                 type: string
 *                 example: "RRC Event"
 *               year:
 *                 type: number
 *                 example: 2020
 *               price:
 *                 type: number
 *                 example: 100
 *               color:
 *                 type: string
 *                 example: "blue"
 *     responses:
 *       '201':
 *         description: Post created successfully
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

carRouter.post("/cars", validateRequest(carSchemas.create), carController.createCarHandler);

/**
 * @openapi
 * /cars:
 *   get:
 *     summary: Retrieve all cars
 *     tags: [Cars]
 *     responses:
 *       '200':
 *         description: A list of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

carRouter.get("/cars", carController.getAllCarsHandler);

/**
 * @openapi
 * /cars/{id}:
 *   get:
 *     summary: Get a car by ID
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "Toyota Camry2020Red"
 *         description: The car ID
 *     responses:
 *       '200':
 *         description: Car retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       '400':
 *         description: Invalid ID supplied
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '404':
 *         description: Car not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

carRouter.get("/cars/:id", validateRequest(carSchemas.getById), carController.getCarByIdHandler);

/**
 * @openapi
 * /cars/{id}:
 *   put:
 *     summary: Update an existing car
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The car ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       '200':
 *         description: Car updated successfully
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
 *       '404':
 *         description: Car not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

carRouter.put("/cars/:id", validateRequest(carSchemas.update), carController.updateCarHandler);

/**
 * @openapi
 * /cars/{id}:
 *   delete:
 *     summary: Delete a car
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "Toyota Camry2020Red"
 *         description: The car ID
 *     responses:
 *       '200':
 *         description: Car deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Car deleted successfully"
 *       '400':
 *         description: Invalid ID supplied
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '404':
 *         description: Car not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

carRouter.delete("/cars/:id", validateRequest(carSchemas.delete), carController.deleteCarHandler);

export default carRouter;