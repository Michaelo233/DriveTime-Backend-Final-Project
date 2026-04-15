import express, { Express } from "express";
import morgan from "morgan";
import {
    accessLogger,
    errorLogger,
    consoleLogger,
} from "./api/v1/middleWare/logger";
import errorHandler from "./api/v1/middleWare/errorHandler";
import carRouter from "./api/v1/routes/carRoutes";
import buyCarRouter from "./api/v1/routes/buyCarRoutes";
import setupSwagger from "./config/swagger";
const app: Express = express();

// Logging middleware (should be applied early in the middleware stack)
if (process.env.NODE_ENV === "production") {
    // In production, log to files
    app.use(accessLogger);
    app.use(errorLogger);
} else {
    // In development, log to console for immediate feedback
    app.use(consoleLogger);
}


// Use Morgan for HTTP request logging
app.use(morgan("combined"));

// Body parsing middleware
app.use(express.json());

// API Routes
app.use("/api/v1", carRouter);
app.use("/api/v1", buyCarRouter);


// Interface for health check response

interface HealthCheckResponse {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}

// api healthcheck
app.get("/api/v1/health", (req, res) => {
    const healthData: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    };
    res.json(healthData);
});

// Global error handling middleware (MUST be applied last)
app.use(errorHandler);

// Setup Swagger
setupSwagger(app);

export default app;