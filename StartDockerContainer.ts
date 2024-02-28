import Dockerode from "dockerode";

/* initalize a docker postgres database instance */
export const startDockerContainer = async () => {
  // create docker client
  const docker = new Dockerode();

  // pull postgres docker image
  await docker.pull("postgres");

  // create container
  const container = await docker.createContainer({
    Image: "postgres",
    name: "my-postgres-container",
    Env: ["POSTGRES_PASSWORD=mysecret"],
    HostConfig: {},
  });
  await container.start();

  console.log("...postgres container started successfully");
};
