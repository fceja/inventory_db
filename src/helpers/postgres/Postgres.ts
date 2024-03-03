import assert from "assert";
import { IPostgres } from "@helpers/postgres/PostgresTypes";
import { Pool, QueryResult } from "pg";

export default class Postgres {
  containerName = "";
  pgUser = "";
  pgPass = "";
  pgHost = "";
  pgDefaultDatabase = "";
  pgDatabase = "";
  pgPort = "";

  pool: Pool = null;

  constructor(props: IPostgres) {
    this.containerName = props.containerName;
    this.pgUser = props.pgUser;
    this.pgPass = props.pgPass;
    this.pgHost = props.pgHost;
    this.pgDefaultDatabase = props.pgDefaultDatabase;
    this.pgDatabase = props.pgDatabase;
    this.pgPort = props.pgPort;
  }

  checkIfDbExists = async () => {
    try {
      const query = `
          SELECT datname
          FROM pg_database;
          `;

      const { rows }: QueryResult = await this.pool.query(query);
      const databases = rows.map((row) => row.datname);

      return databases.includes(this.pgDatabase);
    } catch (error) {
      console.error(error);
    }

    return false;
  };

  createDbConnection = async () => {
    this.pool = new Pool({
      user: this.pgUser,
      host: this.pgHost,
      database: this.pgDefaultDatabase,
      password: this.pgPass,
      port: Number(this.pgPort.split(":")[0]),
    });
  };

  createDb = async () => {
    try {
      const query = `CREATE DATABASE ${this.pgDatabase}`;
      await this.pool.query(query);
    } catch (error) {
      console.error(error);
    }
  };

  disconnectDb = async () => {
    await this.pool.end();
    this.pool = null;
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
      }
      assert.equal(true, await this.checkIfDbExists());

      // disconnect from db
      await this.disconnectDb();
    } catch (error) {
      console.error("Error connecting to Postgres:", error);
    }
  };
}
