import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("items", (table) => {
    table.increments("itemId").primary();
    table.integer("parentFolderId").notNullable();
    table.decimal("cost", 10, 2).notNullable().defaultTo(0.00);
    table.string("name", 100).notNullable().unique();
    table.string("nodeType", 20).notNullable().defaultTo('item').checkIn(['item'], 'nodeType');
    table.decimal("price", 10, 2).notNullable().defaultTo(0.00);
    table.integer("quantity").notNullable().defaultTo(0).unsigned();
    table.dateTime("createdAt").defaultTo(knex.fn.now()).notNullable();
    table.dateTime("updatedAt").defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("items");
}