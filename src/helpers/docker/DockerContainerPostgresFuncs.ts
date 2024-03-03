import { IDockerContainerPostgres } from "@helpers/docker/DockerTypes";
import { executeShellCommand } from "@helpers/shell/ExecuteShellCommand";

export class DockerContainerPostgresFuncs {
  containerName = "";
  pgUser = "";
  pgPass = "";
  pgPort = "";

  constructor(props: IDockerContainerPostgres) {
    this.containerName = props.containerName;
    this.pgUser = props.pgUser;
    this.pgPass = props.pgPass;
    this.pgPort = props.pgPort;
  }

  /* checks if postgres docker exists */
  checkPostgresContainerExists = async () => {
    const command = 'docker ps -a --format "{{.Names}}"';
    const result = await executeShellCommand(command);
    const containerNames = result.split("\n");

    return containerNames.includes(this.containerName);
  };

  /* creates and starts postgres docker container */
  createPostgresContainer = async () => {
    try {
      await executeShellCommand("docker pull postgres");

      // create postgres container
      await executeShellCommand(`docker create \
          --name ${this.containerName} \
          --env POSTGRES_USER=${this.pgUser} \
          --env POSTGRES_PASSWORD=${this.pgPass} \
          -p ${this.pgPort} \
          postgres
          `);

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
        `docker start ${this.containerName}`,
      );

      // check if out container is returned (running)
      if (result.trim() === this.containerName) {
        console.log("...postgres docker container running");
      } else {
        throw new Error("Expected container names to match but did not");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* initializes posgtres container */
  initPostgresContainer = async () => {
    // checks to see if postgres container already exists, otherwise it creates one
    try {
      if (!(await this.checkPostgresContainerExists())) {
        console.log("...creating new postgres docker container");
        await this.createPostgresContainer();
      } else {
        console.log("...postgres docker container already exists");
      }

      console.log("...starting postgres docker container");
      await this.startPostgresContainer();
    } catch (error) {
      console.error(error);
    }
  };
}
