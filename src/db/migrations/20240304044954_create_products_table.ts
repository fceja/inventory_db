import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("products", (table) => {
    table.increments("id").primary();
    table.smallint("categories_id");
    table.string("bar_code", 50);
    table.string("sku_code", 50);
    table.string("qr_code", 50);
    table.string("name", 100).notNullable();
    table.string("description", 200);
    table.integer("quantity").notNullable();
    table.smallint("weight");
    table.smallint("height");
    table.smallint("width");
    table.smallint("depth");
    table.tinyint("refrigerated").notNullable();
    table.tinyint("fragile").notNullable();
    table.tinyint("heavy").notNullable();

    // timestamps creates `created_at` and `updated_at` columns
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("products");
}
