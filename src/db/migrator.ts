import { pathToFileURL } from "node:url";

import { SequelizeStorage, Umzug } from "umzug";

import { sequelize } from "./sequelize.js";

export const migrator = new Umzug({
  migrations: {
    glob: "src/db/migrations/*.{ts,js}",
    resolve: ({ name, path, context }) => {
      if (!path) {
        throw new Error(`Migration path missing for ${name}`);
      }

      return {
        name,
        up: async () => {
          const migration = await import(pathToFileURL(path).href);
          await migration.up(context);
        },
        down: async () => {
          const migration = await import(pathToFileURL(path).href);
          await migration.down(context);
        },
      };
    },
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});
