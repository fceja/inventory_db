import { startDockerDesktop } from "./StartDockerDesktop";
import { startDockerContainer } from "./StartDockerContainer";

const main = async () => {
  await startDockerDesktop();
  await startDockerContainer();
};

main().catch((error) => {
  console.error(error);
});
