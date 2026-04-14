import Joi from "joi";

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