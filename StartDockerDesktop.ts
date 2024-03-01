import { execAsync } from "./ExecuteAsync";

export const startDockerDesktop = async () => {
  try {
    const command =
      process.platform === "win32"
        ? 'start /min "" "docker' // windows
        : "open -a Docker"; // macOs

    console.log("...initializing docker desktop");
    await execAsync(command);
    await isDockerDesktopStarted();
  } catch (error) {
    console.error(`...initializing docker desktop failed -> ${error}`);
  }
};

const isDockerDesktopStarted = async () => {
  let success = false;

  while (!success) {
    try {
      const command = "docker info";
      const result = await execAsync(command);

      if (result.includes("Client")) {
        success = true;
        console.log("...docker desktop running");
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch {
      console.log("...docker desktop starting");
    }
  }
};
