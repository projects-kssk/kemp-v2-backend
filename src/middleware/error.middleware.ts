import type { ErrorRequestHandler } from "express";

export const errorMiddleware: ErrorRequestHandler = (error, _req, res, _next) => {
  void _next;

  res.status(500).json({
    status: "error",
    message: error instanceof Error ? error.message : "Internal server error",
  });
};
