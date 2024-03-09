module.exports = {
  development: {
    client: process.env.POSTGRES_CLIENT,
    connection: {
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT.split(":")[0]),
      database: process.env.POSTGRES_DB,
    },
    migrations: {
      directory: "../db/migrations",
    },
    seeds: {
      directory: "../db/seeds",
    },
  },
};
