import configData from "@config/config.json";
import DockerFuncs from "@helpers/docker/DockerFuncs";
import Postgres from "@helpers/postgres/Postgres";

const main = async () => {
  const docker = new DockerFuncs(configData);
  await docker.dockerDesktop.initDockerDesktop();
  await docker.dockerContainer.initPostgresContainer();

  const postgres = new Postgres(configData);
  await postgres.initDB();
};

main().catch((error) => {
  console.error(error);
});
