import assert from "assert";
import knex, { Knex } from "knex";
import { QueryResult } from "pg";

import { executeShellCommand } from "@helpers/shell/ExecuteShellCommand";

export default class Postgres {
  dbConn: Knex = null;

  checkIfDbExists = async () => {
    try {
      const query = `
          SELECT datname
          FROM pg_database;
          `;

      const { rows }: QueryResult = await this.dbConn.raw(query);
      const databases = rows.map((row) => row.datname);

      return databases.includes(process.env.POSTGRES_DB);
    } catch (error) {
      console.error(error);
    }

    return false;
  };

  createDbConnection = async () => {
    this.dbConn = knex({
      client: process.env.POSTGRES_CLIENT,
      connection: {
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DEFAULT_DB,
        password: process.env.POSTGRES_PASSWORD,
        port: Number(process.env.POSTGRES_PORT.split(":")[0]),
      },
    });
  };

  createDb = async () => {
    try {
      const query = `CREATE DATABASE ${process.env.POSTGRES_DB}`;
      await this.dbConn.raw(query);
    } catch (error) {
      console.error(error);
    }
  };

  runMigrations = async () => {
    try {
      const command = `npx knex migrate:latest --knexfile=${process.env.KNEX_FILE_PATH}`;
      await executeShellCommand(command);
    } catch (error) {
      console.error(error);
    }
  };

  runSeeds = async () => {
    try {
      const command = `npx knex seed:run --knexfile=${process.env.KNEX_FILE_PATH}`;
      await executeShellCommand(command);
    } catch (error) {
      console.error(error);
    }
  };

  disconnectDb = async () => {
    await this.dbConn.destroy();
    this.dbConn = null;
  };

  initDB = async () => {
    try {
      // initiate db connection
      await this.createDbConnection();

      // check if db exists, else create
      if (await this.checkIfDbExists()) {
        console.log(`...db already exists`);
      } else {
        console.log(`...creating new db`);
        await this.createDb();

        console.log(`...applying migrations`);
        await this.runMigrations();

        console.log(`...applying seeds`);
        await this.runSeeds();
      }
      assert.equal(true, await this.checkIfDbExists());
      console.log(`...db created`);

      // disconnect from db
      await this.disconnectDb();
    } catch (error) {
      console.error("Error connecting to Postgres:", error);
    }
  };
}
