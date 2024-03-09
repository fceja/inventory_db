# Description

Sets up a Docker container with PostgreSQL database for an inventory management application, including table creation and establishing relationships. It either creates a new database or initializes an existing one.

## Installation

1. Clone repo
2. Install Node:

   - `https://nodejs.org/en/download`

3. Install Docker:

   - `https://docs.docker.com/get-docker/`

4. Install dependencies:
   - `npm install`

5. Create `.env` file at project root with project environment variables
   - sample environment file is provided at project root, you can simply rename this file for this to work
      - rename `.env.sample` file to -> `.env`
      - modify as needed
     
## Init Docker container with PostgreSql

1. Initiate a new or existing PostgreSQL database:
   - `tsc && ts-node --require tsconfig-paths/register dist/main.js`
