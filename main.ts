import configData from "./config.json";
import { DockerFuncs } from "./helpers/docker/dockerFuncs";

const main = async () => {
  const docker = new DockerFuncs(configData.dockerConfig);
  await docker.dockerDesktop.initDockerDesktop();
  await docker.dockerContainer.initPostgresContainer();
};

main().catch((error) => {
  console.error(error);
});
