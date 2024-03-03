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

  createDbConnection = async () => {
    this.pool = new Pool({
      user: this.pgUser,
      host: this.pgHost,
      database: this.pgDefaultDatabase,
      password: this.pgPass,
      port: Number(this.pgPort.split(":")[0]),
    });
  };

  checkIfDbExists = async () => {
    try {
      console.log("...checking if database exists");
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

  disconnectDb = async () => {
    await this.pool.end();
    this.pool = null;
  };

  initDB = async () => {
    try {
      await this.createDbConnection();

      if (await this.checkIfDbExists()) {
        console.log(`...db already exists`);
      } else {
        console.log(`...creating new db`);
      }

      await this.disconnectDb();
    } catch (error) {
      console.error("Error connecting to Postgres:", error);
    }
  };
}
