import configData from "./config.json";

module.exports = {
  development: {
    client: configData.pgClient,
    connection: {
      user: configData.pgUser,
      password: configData.pgPass,
      host: configData.pgHost,
      port: Number(configData.pgPort.split(":")[0]),
      database: configData.pgDatabase,
    },
    migrations: {
      directory: "../db/migrations",
    },
    seeds: {
      directory: "../db/seeds",
    },
  },
};
