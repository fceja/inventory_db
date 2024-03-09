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

Note: sample environment file is provided at project root, modify as needed

## Init PostgreSQL Docker Container

1. Initiate a new or existing PostgreSQL database for inventory app:
   - `tsc && ts-node --require tsconfig-paths/register dist/main.js`
