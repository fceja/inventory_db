import { executeShellCommand } from "@helpers/shell/ExecuteShellCommand";

export class DockerDesktopFuncs {
  /* starts docker desktop app */
  initDockerDesktop = async () => {
    try {
      // execute docker command
      const command =
        process.platform === "win32"
          ? 'start /min "" "docker' // windows
          : "open -a Docker"; // macOs
      console.log("...initializing docker desktop");
      await executeShellCommand(command);

      // wait for docker desktop app to start
      await this.waitDockerDesktopStarted();
    } catch (error) {
      console.error(`...initializing docker desktop failed -> ${error}`);
    }
  };

  /* wait until docker desktop app is running */
  waitDockerDesktopStarted = async () => {
    // loop until docker desktop is running
    let success = false;
    while (!success) {
      try {
        // execute docker command
        const command = "docker info";
        const result = await executeShellCommand(command);

        // if "Client" returned, means docker desktop is running
        if (result.includes("Client")) {
          success = true;
          console.log("...docker desktop running");
        }

        // wait
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch {
        console.log("...docker desktop starting");
      }
    }
  };
}
