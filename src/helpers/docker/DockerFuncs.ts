import { PostgresDockerContainerFuncs } from "@helpers/docker/DockerContainerPostgresFuncs";
import { DockerDesktopFuncs } from "@helpers/docker/DockerDesktopFuncs";

/**
 * Class for managing Docker-related functionalities.
 * Provides methods for interacting with Docker Desktop and managing Docker containers.
 */
export default class DockerFuncs {
  dockerDesktop: DockerDesktopFuncs;
  postgresDockerContainer: PostgresDockerContainerFuncs;

  constructor() {
    this.dockerDesktop = new DockerDesktopFuncs();
    this.postgresDockerContainer = new PostgresDockerContainerFuncs();
  }
}
