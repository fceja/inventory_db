import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("items", (table) => {
    table
      .foreign("parent_folder_id")
      .references("folders.folder_id")
      .onDelete("NO ACTION");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("items", (table) => {
    table.dropForeign("parent_folder_id");
  });
}
