import type { Request, Response } from "express";

import { getApiHealth, getDatabaseHealth } from "./health.service.js";

export const apiHealth = (_req: Request, res: Response) => {
  res.status(200).json(getApiHealth());
};

export const databaseHealth = async (_req: Request, res: Response) => {
  try {
    res.status(200).json(await getDatabaseHealth());
  } catch (error) {
    res.status(503).json({
      status: "error",
      database: "error",
      message: error instanceof Error ? error.message : "Database connection failed",
    });
  }
};
