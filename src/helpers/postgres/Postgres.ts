import assert from "assert";
import knex, { Knex } from "knex";
import { QueryResult } from "pg";

import { executeShellCommand } from "@helpers/shell/ExecuteShellCommand";

export default class Postgres {
  dbConn: Knex = null;

  init = async () => {
    try {
      // initiate connection to postgres
      await this.createConnection();

      // continue with db creation process
      await this.createDb();
    } catch (error) {
      console.error("Error connecting to Postgres:", error);
    } finally {
      // disconnect from db
      await this.disconnectDb();
    }
  };

  checkIfDbExists = async () => {
    try {
      // query to retrieve all existing databases from postgres
      const query = `
      SELECT datname
      FROM pg_database;
      `;

      // execute query
      const { rows }: QueryResult = await this.dbConn.raw(query);

      // parse databases' returned
      const databases = rows.map((row) => row.datname);

      return databases.includes(process.env.POSTGRES_DB);
    } catch (error) {
      console.error(error.message);
    }

    return false;
  };

  createConnection = async () => {
    try {
      // create connection to postgres
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
    } catch (error) {
      console.error(error.message);
    }
  };

  createDb = async () => {
    // check if db exists
    const exists = await this.checkIfDbExists();

    if (!exists) {
      // db does not exist, create
      console.log(`...creating new db`);
      await this.createNewDb();

      console.log(`...applying migrations`);
      await this.runMigrations();

      console.log(`...applying seeds`);
      await this.runSeeds();

      console.log(`...db created`);
    } else {
      // db exists, do nothing
      console.log(`...db already exists`);
    }

    assert.equal(true, await this.checkIfDbExists());
  };

  createNewDb = async () => {
    try {
      // query to create postgres database
      const query = `CREATE DATABASE ${process.env.POSTGRES_DB}`;

      // execute query
      await this.dbConn.raw(query);
    } catch (error) {
      console.error(error);
    }
  };

  disconnectDb = async () => {
    // end connection to postgres
    await this.dbConn.destroy();
    this.dbConn = null;
  };

  runMigrations = async () => {
    try {
      // shell command to run knex migration to apply db schema
      const command = `npx knex migrate:latest --knexfile=${process.env.KNEX_FILE_PATH}`;

      // execute shell command
      await executeShellCommand(command);
    } catch (error) {
      console.error(error);
    }
  };

  runSeeds = async () => {
    try {
      // shell command to run knex seed to populate database records
      const command = `npx knex seed:run --knexfile=${process.env.KNEX_FILE_PATH}`;

      // execute shell command
      await executeShellCommand(command);
    } catch (error) {
      console.error(error);
    }
  };
}
