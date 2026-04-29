import "dotenv/config";

const requiredEnv = (name: string) => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 4000),
  databaseUrl: process.env.DATABASE_URL,
  dbClient: process.env.DB_CLIENT ?? "postgres",
  dbHost: process.env.DB_HOST,
  dbPort: Number(process.env.DB_PORT ?? 5432),
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
};

export const requiredDatabaseEnv = () => ({
  name: requiredEnv("DB_NAME"),
  user: requiredEnv("DB_USER"),
  password: requiredEnv("DB_PASSWORD"),
  host: requiredEnv("DB_HOST"),
});
