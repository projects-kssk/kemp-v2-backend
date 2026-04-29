import cors from "cors";
import express from "express";
import { toNodeHandler } from "better-auth/node";

import { env } from "./config/env.js";
import { auth } from "./lib/auth.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { notFoundMiddleware } from "./middleware/not-found.middleware.js";
import { requestLoggerMiddleware } from "./middleware/request-logger.middleware.js";
import { router } from "./routes/index.js";

export const app = express();

app.use(
  cors({
    origin: env.corsOrigin,
    credentials: true,
  }),
);
app.use(requestLoggerMiddleware);
app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use(express.json());
app.use(router);
app.use(notFoundMiddleware);
app.use(errorMiddleware);
