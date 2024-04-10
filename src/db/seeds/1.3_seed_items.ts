import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  return knex("items").insert([
    {
      parent_folder_id: 0,
      name: "Item 1",
    },
    {
      parent_folder_id: 1,
      name: "Item 2",
    },
    {
      parent_folder_id: 2,
      name: "Item 3",
    },
    {
      parent_folder_id: 3,
      name: "Item 4",
    },
  ]);
}
