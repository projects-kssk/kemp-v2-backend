import { Sequelize } from "sequelize";

import { env, requiredDatabaseEnv } from "../config/env.js";

if (env.dbClient !== "postgres") {
  throw new Error(`Unsupported DB_CLIENT: ${env.dbClient}`);
}

const logging = env.dbLogging ? console.log : false;

export const sequelize = env.databaseUrl
  ? new Sequelize(env.databaseUrl, {
      dialect: "postgres",
      logging,
    })
  : new Sequelize(requiredDatabaseEnv().name, requiredDatabaseEnv().user, requiredDatabaseEnv().password, {
      dialect: "postgres",
      host: requiredDatabaseEnv().host,
      port: env.dbPort,
      logging,
    });
