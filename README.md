# run

tsc && ts-node --require tsconfig-paths/register dist/main.js

// create migration file
npx knex migrate:make create_products_table --knexfile=./src/config/knexConfig.ts

// apply all pending migrations
npx knex migrate:latest --knexfile=./src/config/knexConfig.ts

// roll back to last migration
npx knex migrate:rollback --knexfile=./src/config/knexConfig.ts

// roll back all applied migrations
npx knex migrate:rollback --all --knexfile=./src/config/knexConfig.ts

// roll back to a specific migration
npx knex migrate:rollback --to=<migration_file_name> --knexfile=./src/config/knexConfig.ts
