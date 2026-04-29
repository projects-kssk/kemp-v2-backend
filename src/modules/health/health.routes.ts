import { Router } from "express";

import { apiHealth, databaseHealth } from "./health.controller.js";

export const healthRouter = Router();

healthRouter.get("/", apiHealth);
healthRouter.get("/db", databaseHealth);
