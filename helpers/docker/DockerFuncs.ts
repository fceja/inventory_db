import { DockerDesktopFuncs } from "./DockerDesktopFuncs";
import { DockerContainerFuncs } from "./DockerContainerFuncs";
import { DockerFuncsI } from "./DockerTypes";

export class DockerFuncs implements DockerFuncsI {
  containerConfig: {
    postgresConfig: {
      imageName: "";
      containerName: "";
      pass: "";
    };
  };
  dockerDesktop: DockerDesktopFuncs;
  dockerContainer: DockerContainerFuncs;

  constructor(props: DockerFuncsI) {
    this.dockerDesktop = new DockerDesktopFuncs();
    this.dockerContainer = new DockerContainerFuncs(props.containerConfig);
  }
}
