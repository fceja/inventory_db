import { TPostgresConfig } from "@helpers/postgres/PostgresTypes";

export interface IDockerContainerPostgres extends TPostgresConfig {}
export interface IDocker extends IDockerContainerPostgres {}
