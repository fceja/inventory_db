import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("items", (table) => {
    table
      .foreign("parentFolderId")
      .references("folders.folderId")
      .onDelete("NO ACTION");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("items", (table) => {
    table.dropForeign("parentFolderId");
  });
}
