import Joi from "joi";
// import { register } from "node:module";

/**
 * @openapi
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       required:
 *         - model
 *         - brand
 *         - year
 *         - price
 *         - color
 *       properties:
 *         model:
 *           type: string
 *           description: The car model
 *           example: "Camry"
 *         brand:
 *           type: string
 *           description: The car brand
 *           example: "Toyota"
 *         year:
 *           type: number
 *           description: The car year
 *           example: 2020
 *         price:
 *           type: number
 *           description: The car price
 *           example: 25000
 *         color:
 *           type: string
 *           description: The car color
 *           example: "Red"
 *
 *     CreatePostRequest:
 *       type: object
 *       required:
 *         - model
 *         - brand
 *         - year
 *         - price
 *         - color
 *       properties:
 *         model:
 *           type: string
 *           example: "Camry"
 *         brand:
 *           type: string
 *           example: "Toyota"
 *         year:
 *           type: number
 *           example: 2020
 *         price:
 *           type: number
 *           example: 100
 *         color:
 *           type: string
 *           example: "Red"
 *
 *     UpdatePostRequest:
 *       type: object
 *       properties:
 *         model:
 *           type: string
 *           example: "Camry"
 *         brand:
 *           type: string
 *           example: "Toyota"
 *         year:
 *           type: number
 *           example: 2020
 *         price:
 *           type: number
 *           example: 100
 *         color:
 *           type: string
 *           example: "Red"
 *
 *     Error:
 *       type: object
 *       properties:
 *         model:
 *           type: string
 *           example: "model is required"
 *         brand:
 *           type: string
 *           example: "brand is required"
 *         year:
 *           type: number
 *           example: "year is required"
 *         price:
 *           type: number
 *           example: "price is required"
 *         color:
 *           type: string
 *           example: "color is required"
 */

// Post operation schemas organized by request part
export const carSchemas = {
    // POST /events - Create new car
    create: {
        body: Joi.object({
            model: Joi.string().min(3).required(),
            brand: Joi.string().min(3).required(),
            year: Joi.number().integer().min(1886).required(),
            price: Joi.alternatives().try(Joi.number(), Joi.string()).optional(),
            color: Joi.string().min(3).required(),
        }),
    },

     // GET /events/:id - Get single car by ID
    getById: {
        params: Joi.object({
            id: Joi.string().required(),
        }),
        query: Joi.object({
            include: Joi.string().valid("comments", "author").optional(),
        }),
    },
        // PUT /events/:id - Update car by ID
    update: {
        params: Joi.object({
            id: Joi.string().required(),
        }),
        body: Joi.object({
            model: Joi.string().min(3),
            brand: Joi.string().min(3),
            year: Joi.number().integer().min(1886),
            price: Joi.alternatives().try(Joi.number(), Joi.string()).optional(),
            color: Joi.string().min(3),
            status: Joi.string().valid("available", "sold", "pending").optional(),
        }),
    },

    // DELETE /events/:id - Delete car by ID
    delete: {
        params: Joi.object({
            id: Joi.string().required(),
        }),
    },
    
};