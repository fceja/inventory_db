import { DockerContainerPostgresFuncs } from "@helpers/docker/DockerContainerPostgresFuncs";
import { DockerDesktopFuncs } from "@helpers/docker/DockerDesktopFuncs";
import { DockerI } from "@helpers/docker/DockerTypes";

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
