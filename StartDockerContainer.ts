import { exec } from "child_process";
import Dockerode from "dockerode";

const containerName = "my-postgres-container";
const imageName = "postgres";
const postgresPass = "POSTGRES_PASSWORD=mysecret";

/* initalize a docker postgres database instance */
export const createDockerContainer = async () => {
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

  console.log("...postgres created successfully");
};

const checkContainerExists = () => {
  return new Promise((resolve, reject) => {
    exec('docker ps -a --format "{{.Names}}"', (error, stdout) => {
      if (error) {
        reject(error);
      }

      const containerNames = stdout.split("\n");
      resolve(containerNames.includes(containerName));
    });
  });
};

const execAsync = (command: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout) => {
      if (error) {
        reject(error);
      }

      resolve(stdout);
    });
  });
};

const runContainer = async () => {
  const result = await execAsync(`docker start ${containerName}`);
  console.log(`runContainer result -> ${result}`);
};

/* initalize a docker postgres database instance */
export const startDockerContainer = async () => {
  try {
    if (await checkContainerExists()) {
      runContainer();
    } else {
      createDockerContainer();
    }
  } catch (error) {
    console.error(error);
  }
};
