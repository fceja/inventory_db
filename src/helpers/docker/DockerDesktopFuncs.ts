import { executeShellCommand } from "@helpers/shell/ExecuteShellCommand";

export class DockerDesktopFuncs {
  /* starts docker desktop app */
  startDockerDesktop = async () => {
    try {
      // shell command
      const command =
        process.platform === "win32"
          ? 'start /min "" "docker' // windows
          : "open -a Docker"; // macOs

      // execute docker shell command
      console.log("...initializing docker desktop");
      await executeShellCommand(command);

      // wait for docker desktop app to start
      await this.waitDockerDesktopIsRunning();
    } catch (error) {
      console.error(`...initializing docker desktop failed -> ${error}`);
    }
  };

  /* waits until docker desktop app is running */
  waitDockerDesktopIsRunning = async () => {
    // loop until docker desktop is running
    let success = false;
    while (!success) {
      try {
        // shell command
        const command = "docker info";

        // execute docker shell command
        const result = await executeShellCommand(command);

        // if "Client" returned, means docker desktop is running
        if (result.includes("Client")) {
          success = true;
          console.log("...docker desktop running");
        }

        // wait before checking again
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch {
        console.log("...docker desktop starting");
      }
    }
  };
}
