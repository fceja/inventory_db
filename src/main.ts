import DockerFuncs from "@helpers/docker/DockerFuncs";
import Postgres from "@helpers/postgres/Postgres";
import dotenv from "dotenv";

// apply env vars
dotenv.config();

const main = async () => {
  const docker = new DockerFuncs();
  await docker.dockerDesktop.startDockerDesktop();
  await docker.dockerContainer.initPostgresDockerContainer();

  const postgres = new Postgres();
  await postgres.createDbAndApplyConfig();
};

main().catch((error) => {
  console.error(error);
});
