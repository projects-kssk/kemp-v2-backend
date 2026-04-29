import cors from "cors";
import express from "express";

import { sequelize } from "./config/database.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    api: "ok",
    timestamp: new Date().toISOString(),
  });
});

app.get("/health/db", async (_req, res) => {
  try {
    await sequelize.authenticate();

    res.status(200).json({
      status: "ok",
      database: "ok",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(503).json({
      status: "error",
      database: "error",
      message: error instanceof Error ? error.message : "Database connection failed",
    });
  }
});
