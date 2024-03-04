import assert from "assert";
import knex, { Knex } from "knex";
import { QueryResult } from "pg";

import { executeShellCommand } from "@helpers/shell/ExecuteShellCommand";
import { IPostgres } from "@helpers/postgres/PostgresTypes";

export default class Postgres {
  containerName = "";
  pgClient = "";
  pgUser = "";
  pgPass = "";
  pgHost = "";
  pgDefaultDatabase = "";
  pgDatabase = "";
  pgPort = "";
  knexFilePath = "";

  dbConn: Knex = null;

  constructor(props: IPostgres) {
    this.containerName = props.containerName;
    this.pgClient = props.pgClient;
    this.pgUser = props.pgUser;
    this.pgPass = props.pgPass;
    this.pgHost = props.pgHost;
    this.pgDefaultDatabase = props.pgDefaultDatabase;
    this.pgDatabase = props.pgDatabase;
    this.pgPort = props.pgPort;
    this.knexFilePath = props.knexFilePath;
  }

  checkIfDbExists = async () => {
    try {
      const query = `
          SELECT datname
          FROM pg_database;
          `;

      const { rows }: QueryResult = await this.dbConn.raw(query);
      const databases = rows.map((row) => row.datname);

      return databases.includes(this.pgDatabase);
    } catch (error) {
      console.error(error);
    }

    return false;
  };

  createDbConnection = async () => {
    this.dbConn = knex({
      client: this.pgClient,
      connection: {
        user: this.pgUser,
        host: this.pgHost,
        database: this.pgDefaultDatabase,
        password: this.pgPass,
        port: Number(this.pgPort.split(":")[0]),
      },
    });
  };

  createDb = async () => {
    try {
      const query = `CREATE DATABASE ${this.pgDatabase}`;
      await this.dbConn.raw(query);
    } catch (error) {
      console.error(error);
    }
  };

  runMigrations = async () => {
    try {
      const command = `npx knex migrate:latest --knexfile=${this.knexFilePath}`;
      await executeShellCommand(command);
    } catch (error) {
      console.error(error);
    }
  };

  runSeeds = async () => {
    try {
      const command = `npx knex seed:run --knexfile=${this.knexFilePath}`;
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
      console.log(`...db running`);

      // disconnect from db
      await this.disconnectDb();
    } catch (error) {
      console.error("Error connecting to Postgres:", error);
    }
  };
}
