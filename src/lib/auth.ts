import { betterAuth } from "better-auth";
import { Pool } from "pg";

import { env, requiredDatabaseEnv } from "../config/env.js";

const databaseConfig = env.databaseUrl
  ? { connectionString: env.databaseUrl }
  : {
      database: requiredDatabaseEnv().name,
      user: requiredDatabaseEnv().user,
      password: requiredDatabaseEnv().password,
      host: requiredDatabaseEnv().host,
      port: env.dbPort,
    };

export const auth = betterAuth({
  appName: "Kemp",
  baseURL: env.betterAuthUrl,
  trustedOrigins: [env.corsOrigin],
  secret: env.betterAuthSecret,
  database: new Pool(databaseConfig),
  emailAndPassword: {
    enabled: true,
  },
});
