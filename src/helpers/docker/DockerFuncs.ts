import { DockerContainerPostgresFuncs } from "@helpers/docker/DockerContainerPostgresFuncs";
import { DockerDesktopFuncs } from "@helpers/docker/DockerDesktopFuncs";
import { DockerI } from "@helpers/docker/DockerTypes";

export default class DockerFuncs implements DockerI {
  containerConfig: {
    postgresConfig: {
      containerName: "";
      envData: "";
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
