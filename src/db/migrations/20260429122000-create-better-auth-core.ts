import { DataTypes, type QueryInterface } from "sequelize";

export const up = async (queryInterface: QueryInterface) => {
  await queryInterface.createTable("user", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  await queryInterface.createTable("session", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userAgent: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  await queryInterface.createTable("account", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    accountId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    providerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accessToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    accessTokenExpiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    refreshTokenExpiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    scope: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    idToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  await queryInterface.createTable("verification", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    identifier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  await queryInterface.addIndex("session", ["userId"]);
  await queryInterface.addIndex("account", ["userId"]);
  await queryInterface.addIndex("account", ["providerId", "accountId"], {
    unique: true,
    name: "account_provider_account_unique",
  });
  await queryInterface.addIndex("verification", ["identifier"]);
};

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.dropTable("verification");
  await queryInterface.dropTable("account");
  await queryInterface.dropTable("session");
  await queryInterface.dropTable("user");
};
