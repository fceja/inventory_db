import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("folders", (table) => {
    table
      .foreign("parentFolderId")
      .references("folders.folderId")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("folders", (table) => {
    table.dropForeign("parentFolderId");
  });
}
