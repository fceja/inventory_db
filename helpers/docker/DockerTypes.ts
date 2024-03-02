type PostgresConfigT = {
  imageName: string;
  containerName: string;
  pass: string;
};

export interface DockerContainerPostgresI {
  postgresConfig: PostgresConfigT;
}

export interface DockerI {
  containerConfig: DockerContainerPostgresI;
}
