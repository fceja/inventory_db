import DockerFuncs from "@helpers/docker/DockerFuncs";
import Postgres from "@helpers/postgres/Postgres";
import dotenv from "dotenv";

// apply env vars
dotenv.config({ path: ".env.sample" });

const main = async () => {
  const docker = new DockerFuncs();
  await docker.dockerDesktop.startDockerDesktop();
  await docker.postgresDockerContainer.init();

  const postgres = new Postgres();
  await postgres.init();
};

main().catch((error) => {
  console.error(error);
});
