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

      console.log("...waiting for postgres docker container to load");
      await this.waitUntilPostgresLoaded();
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
    } catch (error) {
      console.log(error.message);
    }
  };

  waitUntilPostgresLoaded = async () => {
    const command = `docker exec ${process.env.DOCKER_CONTAINER_NAME} pg_isready`;

    const maxRetries = 10;
    let retries = 0;
    let isLoaded = false;
    while (retries < maxRetries) {
      try {
        const stdOut = await executeShellCommand(command);

        if (stdOut.includes("accepting connections")) {
          isLoaded = true;
          break;
        }
      } catch {
        console.log(`...loading`);
        await new Promise((resolve) => setTimeout(resolve, 500));

        retries++;
      }
    }

    if (!isLoaded) throw new Error("Error loading postgres docker container.");

    console.log("...postgres docker container running");
  };
}
