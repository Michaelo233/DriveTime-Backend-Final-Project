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
import adminRouter from "./api/v1/routes/adminRoutes";
import userRouter from "./api/v1/routes/userRoutes";
import salesRouter from "./api/v1/routes/salesRoutes";
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
app.use("/api/v1", salesRouter);

// Mount the user routes
app.use("/api/v1/users", userRouter);
// Mount the admin routes
app.use("/api/v1/admin", adminRouter);


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