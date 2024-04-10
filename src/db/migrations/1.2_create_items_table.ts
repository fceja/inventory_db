import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("items", (table) => {
    table.increments("item_id").primary();
    table.integer("parent_folder_id").notNullable();
    table.string("name", 100).notNullable().unique();
    table.string("node_type", 20).notNullable().defaultTo('item').checkIn(['item'], 'node_type');

    // timestamps creates `created_at` and `updated_at` columns
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("items");
}