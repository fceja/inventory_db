import configData from "@config/config.json";
import DockerFuncs from "@helpers/docker/DockerFuncs";

const main = async () => {
  const docker = new DockerFuncs(configData);

  await docker.dockerDesktop.initDockerDesktop();
  await docker.dockerContainer.initPostgresContainer();
};

main().catch((error) => {
  console.error(error);
});
