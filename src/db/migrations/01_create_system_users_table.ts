import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("system_users", (table) => {
    table.increments("system_users_id").primary();
    table.string("email", 100).notNullable();
    table.string("password", 100).notNullable();
    table.string("role", 20).notNullable();

    // timestamps creates `created_at` and `updated_at` columns
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("system_users");
}
