import { exec } from "child_process";

/* asynchronously executes a shell command */
export const executeShellCommand = (command: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout) => {
      if (error) {
        reject(error);
      }
      resolve(stdout);
    });
  });
};
