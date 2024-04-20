import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  return knex("items").insert([
    {
      parentFolderId: 0,
      name: "Item 1",
      quantity: 25,
      value: 0
    },
    {
      parentFolderId: 1,
      name: "Item 2",
      quantity: 100,
      value: 50.21
    },
    {
      parentFolderId: 2,
      name: "Item 3",
      quantity: 125,
      value: 300.97
    },
    {
      parentFolderId: 3,
      name: "Item 4",
      quantity: 25,
      value: 100.00
    },
  ]);
}
