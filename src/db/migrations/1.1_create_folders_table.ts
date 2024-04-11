import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("folders", (table) => {
    table.dateTime("createdAt").defaultTo(knex.fn.now()).notNullable();
    table.increments("folderId").primary();
    table.string("name", 255).notNullable().unique();
    table.string("nodeType", 20).notNullable().defaultTo('folder').checkIn(['folder'], 'nodeType');
    table.integer("parentFolderId");
    table.dateTime("updatedAt").defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("folders");
}
