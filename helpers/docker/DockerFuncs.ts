import { DockerDesktopFuncs } from "./DockerDesktopFuncs";
import { DockerContainerPostgresFuncs } from "./DockerContainerPostgresFuncs";
import { DockerI } from "./DockerTypes";

export class DockerFuncs implements DockerI {
  containerConfig: {
    postgresConfig: {
      imageName: "";
      containerName: "";
      pass: "";
    };
  };

  dockerDesktop: DockerDesktopFuncs;
  dockerContainer: DockerContainerPostgresFuncs;

  constructor(props: DockerI) {
    this.dockerDesktop = new DockerDesktopFuncs();
    this.dockerContainer = new DockerContainerPostgresFuncs(
      props.containerConfig,
    );
  }
}
