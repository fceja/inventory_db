import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("products", (table) => {
    table
      .foreign("category_id")
      .references("categories.category_id")
      .onDelete("NO ACTION");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("products", (table) => {
    table.dropForeign("category_id");
  });
}
