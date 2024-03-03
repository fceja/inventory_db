export type TPostgresConfig = {
  containerName: string;
  envPgUser: string;
  envPgPass: string;
  pgPort: string;
};

export interface IPostgres extends TPostgresConfig {}
