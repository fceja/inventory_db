import { executeShellCommand } from "@helpers/shell/ExecuteShellCommand";

export class PostgresDockerContainerFuncs {
  /* initializes postgres docker container */
  init = async () => {
    try {
      // check if postgres docker container already exists, otherwise it creates one
      const exists = await this.checkIfPostgresDockerContainerExists();

      if (!exists) {
        console.log("...creating new postgres docker container");
        await this.createPostgresDockerContainer();
      } else {
        console.log("...postgres docker container already exists");
      }

      console.log("...starting postgres docker container");
      await this.startPostgresDockerContainer();
    } catch (error) {
      console.error(error);
    }
  };

  /* checks if postgres docker exists */
  checkIfPostgresDockerContainerExists = async () => {
    // shell command to retrieve existing docker containers
    const command = 'docker ps -a --format "{{.Names}}"';

    // execute shell command
    const result = await executeShellCommand(command);

    // parse container names
    const containerNames = result.split("\n");

    return containerNames.includes(process.env.DOCKER_CONTAINER_NAME);
  };

  /* creates and starts postgres docker container */
  createPostgresDockerContainer = async () => {
    try {
      // shell command to pull postgres image
      let command = "docker pull postgres";

      // execute shell command
      await executeShellCommand(command);

      // shell command to create postgres docker container
      command = `docker create \
      --name ${process.env.DOCKER_CONTAINER_NAME} \
      --env POSTGRES_USER=${process.env.POSTGRES_USER} \
      --env POSTGRES_PASSWORD=${process.env.POSTGRES_PASSWORD} \
      -p ${process.env.POSTGRES_PORT} \
      postgres
      `;

      // execute shell command
      const result = await executeShellCommand(command);
      if (!result) {
        throw new Error("Error creating postgres docker container.");
      }

      console.log("...postgres docker container created successfully");
    } catch (error) {
      console.error(error);
    }
  };

  /* starts postgres docker container */
  startPostgresDockerContainer = async () => {
    try {
      // shell command to start docker container
      const command = `docker start ${process.env.DOCKER_CONTAINER_NAME}`;

      // execute shell command
      const result = await executeShellCommand(command);

      // check if our container is returned (running)
      if (!(result.trim() === process.env.DOCKER_CONTAINER_NAME)) {
        throw new Error("Returned container name did not match expected.");
      }

      console.log("...postgres docker container running");
    } catch (error) {
      console.log(error);
    }
  };
}
