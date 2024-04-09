import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("folder_items", (table) => {
    table.increments("folder_item_id").primary();
    table.integer("folder_id").notNullable();
    table.string("name", 100).notNullable().unique();

    // timestamps creates `created_at` and `updated_at` columns
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("folder_items");
}