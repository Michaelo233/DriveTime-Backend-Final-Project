import express, { Router } from "express";
import { getUserDetails } from "../controllers/userController";
import authenticate from "../middleWare/authenticate";
import isAuthorized from "../middleWare/authorize";

const userRouter: Router = express.Router();

// API Doc 1: GET endpoint with User Information by ID 
/**
 * @openapi
 * /users/:id:
 *   get:
 *     summary: Retrieve a single user information filtering by user ID
 *     tags: [Users]
 *     security: 
 *       - bearerAuth: []
 *     parameters:
 *       - name: uid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: find the user by id
 *     responses:
 *       '200':
 *         description: Successfully retrieved the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: object
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       '401':
 *          description: Unauthorized - Missing or invalid token
 *       '403':
 *          description: Forbidden - Admin access required
 *       '404':
 *          description: User not found
 */
// Only admins can view detailed user information

// Only admins can view detailed user information
userRouter.get(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin"] }),
    getUserDetails
);

export default userRouter;