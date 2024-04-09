import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("folders", (table) => {
    table.increments("folder_id").primary();
    table.smallint("parent_folder_id");
    table.smallint("child_folder_id");
    table.string("name", 100).notNullable().unique();
    table.smallint("code").notNullable().unique();

    // timestamps creates `created_at` and `updated_at` columns
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("folders");
}
