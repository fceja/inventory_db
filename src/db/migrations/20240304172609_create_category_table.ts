import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("categories", (table) => {
    table.increments("id").primary();
    table.smallint("category_code").notNullable();
    table.integer("product_id").notNullable();

    // timestamps creates `created_at` and `updated_at` columns
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("categories");
}
