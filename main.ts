import configData from "./config.json";
import { DockerDesktopFuncs } from "./helpers/docker/DockerDesktopFuncs";
import { DockerContainerFuncs } from "./helpers/docker/DockerContainerFuncs";

const main = async () => {
  const dockerDektop = new DockerDesktopFuncs();
  await dockerDektop.startDockerDesktop();

  const dockerContainer = new DockerContainerFuncs(
    configData.dockerConfig.containerConfig,
  );
  await dockerContainer.initPostgresContainer();
};

main().catch((error) => {
  console.error(error);
});
