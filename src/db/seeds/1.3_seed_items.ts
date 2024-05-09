import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  return knex("items").insert([
    {
      parentFolderId: 0,
      name: "Item 1 - Printing labels",
      quantity: 25,
      price: 0.00
    },
    {
      parentFolderId: 2,
      name: "Item 2 - Sticker",
      quantity: 100,
      price: 50.21
    },
    {
      parentFolderId: 1,
      name: "Item 3 - Limited Belt",
      quantity: 125,
      price: 300.97
    },
    {
      parentFolderId: 6,
      name: "Item 4 - Plain shirt",
      quantity: 25,
      price: 100.00
    },
    {
      parentFolderId: 6,
      name: "Item 5 - Ink",
      quantity: 25,
      price: 0.01
    },
  ]);
}
