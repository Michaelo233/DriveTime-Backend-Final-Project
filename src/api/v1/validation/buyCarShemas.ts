import Joi from "joi";

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