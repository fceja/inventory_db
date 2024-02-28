import { exec } from "child_process";

export const startDockerDesktop = () => {
  const command =
    process.platform === "win32"
      ? 'start /min "" "docker' // windows
      : "open -a Docker"; // macOs

  exec(command, (error) => {
    if (error) {
      console.error(`error initializing docker desktop. ${error}`);
    }
  });
  console.log("...docker desktop initialized successfully");
};
