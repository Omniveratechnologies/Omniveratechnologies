import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import { seedAdmin } from "./config/seedAdmin.js";
import apiRoutes from "./routes/index.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
const app = express();
const PORT = Number(process.env.PORT) || 5001;
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173,http://localhost:5174") .split(",").map(origin => origin.trim()).filter(Boolean);
app.use(cors({ origin(origin, callback) { if (!origin || allowedOrigins.includes(origin)) return callback(null, true); return callback(new Error("CORS origin not allowed")); }, credentials: true }));
app.use(helmet());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(morgan("dev"));
app.get("/api/health", (req, res) => res.json({ success: true, message: "Omnivera API is running", environment: process.env.NODE_ENV || "development" }));
app.use("/api", apiRoutes);
app.use(notFound);
app.use(errorHandler);
async function startServer() {
  try {
    await connectDB();
    await seedAdmin();
    const server = app.listen(PORT, () => { console.log(`Omnivera API running on http://localhost:${PORT}`); console.log(`Health check: http://localhost:${PORT}/api/health`); });
    server.on("error", error => { if (error.code === "EADDRINUSE") console.error(`Port ${PORT} is already in use. Stop the other process or set PORT to a free port.`); else console.error("HTTP server error:", error); process.exitCode = 1; });
  } catch (error) { console.error("Server startup aborted:", error.message); process.exit(1); }
}
startServer();
