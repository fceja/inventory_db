import { executeShellCommand } from "@helpers/shell/ExecuteShellCommand";

export class DockerContainerPostgresFuncs {
  /* checks if postgres docker exists */
  checkPostgresContainerExists = async () => {
    const command = 'docker ps -a --format "{{.Names}}"';
    const result = await executeShellCommand(command);
    const containerNames = result.split("\n");

    return containerNames.includes(process.env.DOCKER_CONTAINER_NAME);
  };

  /* creates and starts postgres docker container */
  createPostgresContainer = async () => {
    try {
      await executeShellCommand("docker pull postgres");

      // create postgres container
      await executeShellCommand(`docker create \
          --name ${process.env.DOCKER_CONTAINER_NAME} \
          --env POSTGRES_USER=${process.env.POSTGRES_USER} \
          --env POSTGRES_PASSWORD=${process.env.POSTGRES_PASSWORD} \
          -p ${process.env.POSTGRES_PORT} \
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
        `docker start ${process.env.DOCKER_CONTAINER_NAME}`,
      );

      // check if out container is returned (running)
      if (result.trim() === process.env.DOCKER_CONTAINER_NAME) {
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
