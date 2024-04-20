import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("folders", (table) => {
    table.increments("folderId").primary();
    table.integer("parentFolderId");
    table.string("name", 255).notNullable().unique();
    table.string("nodeType", 20).notNullable().defaultTo('folder').checkIn(['folder'], 'nodeType');
    table.dateTime("createdAt").defaultTo(knex.fn.now()).notNullable();
    table.dateTime("updatedAt").defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("folders");
}
