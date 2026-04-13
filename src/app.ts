import express, { Express } from "express";
import morgan from "morgan";
import carRouter from "./api/v1/routes/carRoutes";
import buyCarRouter from "./api/v1/routes/buyCarRoutes";
const app: Express = express();

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

export default app;