type PostgresConfigT = {
  containerName: string;
  envData: string;
};

export interface DockerContainerPostgresI {
  postgresConfig: PostgresConfigT;
}

export interface DockerI {
  containerConfig: DockerContainerPostgresI;
}
