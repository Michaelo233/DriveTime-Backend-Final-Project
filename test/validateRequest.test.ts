import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../src/api/v1/middleWare/validate";
import Joi from "joi";

describe("validateRequest Middleware", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = {
            body: {},
            params: {},
            query: {},
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            locals: {},
        };
        mockNext = jest.fn();
    });

    // We'll add our test setup and test cases here

    // test case # 1: validate valid body input (car creation)
    it("should pass for valid body input", () => {
        // Arrange
        const testSchemas = {
            body: Joi.object({
                model: Joi.string().min(3).required(),
                brand: Joi.string().min(3).required(),
                year: Joi.number().integer().min(1886).required(),
                price: Joi.alternatives().try(Joi.number(), Joi.string()).optional(),
                color: Joi.string().min(3).required(),
            }),
        };
        mockReq.body = { model: "Camry", brand: "Toyota", year: 2020, price: "25000", color: "Red" };
        const middleware = validateRequest(testSchemas);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
        expect(mockRes.json).not.toHaveBeenCalled();
    });

    // test case # 2: invalid car creation input
    it("should fail for invalid body input", () => {
        // Arrange
        const testSchemas = {
            body: Joi.object({
                model: Joi.string().min(3).required(),
                brand: Joi.string().min(3).required(),
                year: Joi.number().integer().min(1886).required(),
                price: Joi.alternatives().try(Joi.number(), Joi.string()).optional(),
                color: Joi.string().min(3).required(),
            }),
        };

        // Model is too short
        mockReq.body = { model: "Ca", brand: "Toyota", year: 2020, color: "Red" };
        const middleware = validateRequest(testSchemas);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: expect.stringContaining("Validation error"),
        });
        expect(mockNext).not.toHaveBeenCalled();
    });

    // test case # 3: invalid year (before 1886)
    it("should fail for invalid body input", () => {
        // Arrange
        const testSchemas = {
            body: Joi.object({
                model: Joi.string().min(3).required(),
                brand: Joi.string().min(3).required(),
                year: Joi.number().integer().min(1886).required(),
                price: Joi.alternatives().try(Joi.number(), Joi.string()).optional(),
                color: Joi.string().min(3).required(),
            }),
        };

        // Year is before 1886
        mockReq.body = { model: "Camry", brand: "Toyota", year: 1800, price: "25000", color: "Red" };
        const middleware = validateRequest(testSchemas);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: expect.stringContaining("Validation error"),
        });
        expect(mockNext).not.toHaveBeenCalled();
    });

    // test case # 4: validate params (car by ID)
    it("should validate params correctly", () => {
        // Arrange
        const testSchemas = {
            params: Joi.object({
                id: Joi.string().required(),
            }),
        };
        mockReq.params = { id: "Toyota Camry2020Red" };
        const middleware = validateRequest(testSchemas);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalled();
    });

    // test case # 4: validate params are missing or not
    it("should fail when required params are missing", () => {
        // Arrange
        const testSchemas = {
            params: Joi.object({
                id: Joi.string().required(),
            }),
        };

        // Missing required id
        mockReq.params = {};
        const middleware = validateRequest(testSchemas);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: expect.stringContaining('Params: "id" is required'),
        });
    });

    // test case # 5: validate all request parts together (car update)
    it("should validate multiple request parts together", () => {
        // Arrange
        const testSchemas = {
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
            query: Joi.object({
                include: Joi.string().valid("comments", "author").optional(),
            }),
        };
        mockReq.params = { id: "Toyota Camry2020Red" };
        mockReq.body = { model: "Accord", brand: "Honda", status: "available" };
        mockReq.query = { include: "comments" };
        const middleware = validateRequest(testSchemas);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalled();
    });


});