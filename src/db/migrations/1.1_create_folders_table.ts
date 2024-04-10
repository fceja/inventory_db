import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("folders", (table) => {
    table.increments("folder_id").primary();
    table.integer("parent_folder_id");
    table.string("name", 255).notNullable().unique();
    table.string("node_type", 20).notNullable().defaultTo('folder').checkIn(['folder'], 'node_type');

    // timestamps creates `created_at` and `updated_at` columns
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("folders");
}
