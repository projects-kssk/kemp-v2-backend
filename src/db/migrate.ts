import { writeFile } from "node:fs/promises";
import { join } from "node:path";

import { migrator } from "./migrator.js";
import { sequelize } from "./sequelize.js";

const command = process.argv[2];
const migrationName = process.argv[3];

const createMigration = async (name?: string) => {
  if (!name) {
    throw new Error("Migration name required. Example: npm run db:create create-products");
  }

  const timestamp = new Date().toISOString().replace(/\D/g, "").slice(0, 14);
  const fileName = `${timestamp}-${name}.ts`;
  const filePath = join(process.cwd(), "src", "db", "migrations", fileName);

  await writeFile(
    filePath,
    `import type { QueryInterface } from "sequelize";

export const up = async (queryInterface: QueryInterface) => {
  void queryInterface;
};

export const down = async (queryInterface: QueryInterface) => {
  void queryInterface;
};
`,
  );

  console.log(`Created migration: ${fileName}`);
};

try {
  if (command === "up") {
    await migrator.up();
  } else if (command === "down") {
    await migrator.down();
  } else if (command === "status") {
    const executed = await migrator.executed();
    const pending = await migrator.pending();

    console.table([
      ...executed.map((migration) => ({ name: migration.name, status: "executed" })),
      ...pending.map((migration) => ({ name: migration.name, status: "pending" })),
    ]);
  } else if (command === "create") {
    await createMigration(migrationName);
  } else {
    throw new Error("Unknown migration command. Use up, down, status, or create.");
  }
} finally {
  await sequelize.close();
}
