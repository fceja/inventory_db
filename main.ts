import { startDockerDesktop } from "./StartDockerDesktop";
import { startDockerContainer as startPostgresDockerContainer } from "./StartPostgresDockerContainer";

const main = async () => {
  await startDockerDesktop();
  await startPostgresDockerContainer();
};

main().catch((error) => {
  console.error(error);
});
