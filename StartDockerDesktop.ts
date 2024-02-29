import { exec } from "child_process";

export const startDockerDesktopApp = () => {
  const command =
    process.platform === "win32"
      ? 'start /min "" "docker' // windows
      : "open -a Docker"; // macOs

  exec(command, (error) => {
    console.log("...initializing docker desktop app");
    if (error) {
      console.error(`error initializing docker desktop. ${error}`);
    }
  });

  const intervalId = setInterval(() => {
    exec("docker info", (error) => {
      if (error) {
        console.error(error);
      } else {
        console.log("...docker desktop app running");
        clearInterval(intervalId);
      }
    });
  }, 500);
};
