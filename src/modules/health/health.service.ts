import { sequelize } from "../../db/sequelize.js";

export const getApiHealth = () => ({
  status: "ok",
  api: "ok",
  timestamp: new Date().toISOString(),
});

export const getDatabaseHealth = async () => {
  await sequelize.authenticate();

  return {
    status: "ok",
    database: "ok",
    timestamp: new Date().toISOString(),
  };
};
