import DockerFuncs from "@helpers/docker/DockerFuncs";
import Postgres from "@helpers/postgres/Postgres";
import dotenv from "dotenv";

// apply env vars
dotenv.config();

const main = async () => {
  const docker = new DockerFuncs();
  await docker.dockerDesktop.initDockerDesktop();
  await docker.dockerContainer.initPostgresContainer();

  const postgres = new Postgres();
  await postgres.initDB();
};

main().catch((error) => {
  console.error(error);
});
