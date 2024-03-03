export type TPostgresConfig = {
  containerName: string;
  pgClient: string;
  pgUser: string;
  pgPass: string;
  pgPort: string;
  pgHost: string;
  pgDefaultDatabase: string;
  pgDatabase: string;
};

export interface IPostgres extends TPostgresConfig {}
