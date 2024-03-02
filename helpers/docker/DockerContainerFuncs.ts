import Dockerode from "dockerode";

import { executeShellCommand } from "../shell/ExecuteShellCommand";

type PostgresConfigT = {
  imageName: string;
  containerName: string;
  pass: string;
};

interface DockerContainerFuncsI {
  postgresConfig: PostgresConfigT;
}

export class DockerContainerFuncs implements DockerContainerFuncsI {
  postgresConfig = {
    imageName: "",
    containerName: "",
    pass: "",
  };

  constructor(props: DockerContainerFuncsI) {
    this.postgresConfig = {
      imageName: props.postgresConfig.imageName,
      containerName: props.postgresConfig.containerName,
      pass: props.postgresConfig.pass,
    };
  }

  /* region - postgres container funcs */
  /* checks if postgres docker exists */
  checkPostgresContainerExists = async () => {
    const command = 'docker ps -a --format "{{.Names}}"';
    const result = await executeShellCommand(command);
    const containerNames = result.split("\n");

    return containerNames.includes(this.postgresConfig.containerName);
  };

  /* creates and starts postgres docker container */
  createAndStartPostgresContainer = async () => {
    try {
      // create docker client
      const docker = new Dockerode();

      // pull postgres docker image
      await docker.pull("postgres");

      // create postgres docker container
      const container = await docker.createContainer({
        Image: this.postgresConfig.imageName,
        name: this.postgresConfig.containerName,
        Env: [this.postgresConfig.pass],
        HostConfig: {},
      });

      // start container
      await container.start();
      console.log("...postgres docker container created successfully");
    } catch (error) {
      console.error(error);
    }
  };

  /* starts postgres docker container */
  startPostgresContainer = async () => {
    try {
      // execute docker comand
      const result = await executeShellCommand(
        `docker start ${this.postgresConfig.containerName}`,
      );

      // check if out container is returned (running)
      if (result.trim() === this.postgresConfig.containerName) {
        console.log("...postgres docker container running");
      } else {
        throw new Error("Expected container names to match but did not");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* initialized posgtres container */
  initPostgresContainer = async () => {
    // checks to see if postgres container already exists, otherwise it creates one
    try {
      if (await this.checkPostgresContainerExists()) {
        // postres container exits, run
        console.log("...postgres docker container already exists");
        this.startPostgresContainer();
      } else {
        // postres container does not exits, create
        console.log("...creating new postgres docker container");
        this.createAndStartPostgresContainer();
      }
    } catch (error) {
      console.error(error);
    }
  };
  /* endregion - postgres container funcs */
}
