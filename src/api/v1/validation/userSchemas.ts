// File: src/api/v1/validations/userSchema.ts
import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - uid
 *         - email
 *       properties:
 *         uid:
 *           type: string
 *           description: Unique identifier for the user
 *           example: "user_123abc"
 *         email:
 *           type: string
 *           format: email
 *           example: "user@example.com"
 *         role:
 *           type: string
 *           enum: [user, admin, developer]
 *           description: User's role in the system
 */

// Your actual Joi validation schemas
export const userSchema = Joi.object({
    uid: Joi.string().required(),
    email: Joi.string().required(),
    role: Joi.string().valid("user", "admin", "developer")
});

/**
 * @openapi
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       required:
 *         - error
 *         - message
 *       properties:
 *         error:
 *           type: string
 *           description: Error type or code
 *           example: "VALIDATION_ERROR"
 *         message:
 *           type: string
 *           description: Human-readable error message
 *           example: "user not found"
 *         details:
 *           type: array
 *           post:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *                 example: "email"
 *               issue:
 *                 type: string
 *                 example: "must be a valid email address"
 *           description: Detailed validation errors (optional)
 */