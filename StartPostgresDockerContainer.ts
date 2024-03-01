import { execAsync } from "./ExecuteAsync";
import Dockerode from "dockerode";

const containerName = "my-postgres-container";
const imageName = "postgres";
const postgresPass = "POSTGRES_PASSWORD=mysecret";

/* initalize a docker postgres database instance */
export const createPostgresDockerContainer = async () => {
  // create docker client
  const docker = new Dockerode();

  // pull postgres docker image
  await docker.pull("postgres");

  // create container
  const container = await docker.createContainer({
    Image: imageName,
    name: containerName,
    Env: [postgresPass],
    HostConfig: {},
  });
  await container.start();

  console.log("...postgres docker container created successfully");
};

const checkPostgresContainerExists = async () => {
  const command = 'docker ps -a --format "{{.Names}}"';
  const result = await execAsync(command);

  const containerNames = result.split("\n");

  return containerNames.includes(containerName);
};

const runContainer = async () => {
  const result = await execAsync(`docker start ${containerName}`);

  if (result.trim() === containerName) {
    console.log("...postgres docker container running");
  } else {
    throw new Error("Expected container names to match but did not");
  }
};

/* initalize a docker postgres database instance */
export const startDockerContainer = async () => {
  try {
    if (await checkPostgresContainerExists()) {
      console.log("...postgres docker container already exists");
      runContainer();
    } else {
      console.log("...creating new postgres docker container");
      createPostgresDockerContainer();
    }
  } catch (error) {
    console.error(error);
  }
};
