import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("systemUsers", (table) => {
    table.increments("systemUserId").primary();
    table.string("email", 100).notNullable();
    table.string("password", 100).notNullable();
    table.string("role", 20).notNullable();
    table.dateTime("createdAt").defaultTo(knex.fn.now()).notNullable();
    table.dateTime("updatedAt").defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("systemUsers");
}
