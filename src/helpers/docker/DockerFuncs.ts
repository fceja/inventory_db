import { DockerContainerPostgresFuncs } from "@helpers/docker/DockerContainerPostgresFuncs";
import { DockerDesktopFuncs } from "@helpers/docker/DockerDesktopFuncs";

export default class DockerFuncs {
  dockerDesktop: DockerDesktopFuncs;
  dockerContainer: DockerContainerPostgresFuncs;

  constructor() {
    this.dockerDesktop = new DockerDesktopFuncs();
    this.dockerContainer = new DockerContainerPostgresFuncs();
  }
}
