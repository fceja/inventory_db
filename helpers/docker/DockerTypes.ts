type PostgresConfigT = {
  imageName: string;
  containerName: string;
  pass: string;
};

export interface DockerContainerFuncsI {
  postgresConfig: PostgresConfigT;
}

export interface DockerFuncsI {
  containerConfig: DockerContainerFuncsI;
}
