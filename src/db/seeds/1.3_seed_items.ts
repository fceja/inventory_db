import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  return knex("items").insert([
    {
      parentFolderId: 0,
      name: "Item 1",
    },
    {
      parentFolderId: 1,
      name: "Item 2",
    },
    {
      parentFolderId: 2,
      name: "Item 3",
    },
    {
      parentFolderId: 3,
      name: "Item 4",
    },
  ]);
}
