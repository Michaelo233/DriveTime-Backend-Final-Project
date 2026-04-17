import Joi from "joi";
// import { register } from "node:module";

/**
 * @openapi
 * components:
 *   schemas:
 *     BuyCar:
 *       type: object
 *       required:
 *         - customerName
 *         - customerEmail
 *         - paymentMethod
 *         - carId
 *         - totalPrice
 *       properties:
 *         customerName:
 *           type: string
 *           description: The customer's name
 *           example: "John Doe"
 *         customerEmail:
 *           type: string
 *           description: The customer's email
 *           example: "john.doe@example.com"
 *         paymentMethod:
 *           type: string
 *           description: The payment method
 *           example: "Credit Card"
 *         carId:
 *           type: string
 *           description: The car brand
 *           example: "Toyota"
 *         totalPrice:
 *           type: number
 *           description: The total price
 *           example: 25000
 *         color:
 *           type: string
 *           description: The car color
 *           example: "Red"
 *
 *     CreatePostRequest:
 *       type: object
 *       required:
 *         - customerName
 *         - customerEmail
 *         - paymentMethod
 *         - carId
 *         - totalPrice
 *       properties:
 *         customerName:
 *           type: string
 *           example: "John Doe"
 *         customerEmail:
 *           type: string
 *           example: "john.doe@example.com"
 *         paymentMethod:
 *           type: string
 *           example: "Credit Card"
 *         carId:
 *           type: string
 *           example: "Toyota"
 *         totalPrice:
 *           type: number
 *           example: 25000
 *         color:
 *           type: string
 *           example: "Red"
 *
 *     Error:
 *       type: object
 *       properties:
 *         customerName:
 *           type: string
 *           example: "customerName is required"
 *         customerEmail:
 *           type: string
 *           example: "customerEmail is required"
 *         paymentMethod:
 *           type: string
 *           example: "paymentMethod is required"
 *         carId:
 *           type: string
 *           example: "carId is required"
 *         totalPrice:
 *           type: number
 *           example: "totalPrice is required"
 */

// Post operation schemas organized by request part
export const buyCarSchemas = {
    // POST /events - Create new car
    create: {
        body: Joi.object({
            customerName: Joi.string().min(3).required(),
            customerEmail: Joi.string().email().required(),
            paymentMethod: Joi.string().min(3).required(),
            carId: Joi.string().required(),
            totalPrice: Joi.number().positive().required(),
        }),
    },
};