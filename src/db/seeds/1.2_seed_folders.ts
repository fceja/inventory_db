import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  return knex("folders").insert([
    {
      folderId: 0,
      parentFolderId: null,
      name: "Root Folder",
    },
    {
      parentFolderId: 0,
      name: "Folder 1 - Web Store",
    },
    {
      parentFolderId: 0,
      name: "Folder 2 - Warehouse",
    },
    {
      parentFolderId: 1,
      name: "Folder 3 - Merch ",
    },
    {
      parentFolderId: 3,
      name: "Folder 4 - Shirts",
    },
    {
      parentFolderId: 3,
      name: "Folder 5 - Sweatshirt",
    },
    {
      parentFolderId: 2,
      name: "Folder 6 - Isle A",
    },
  ]);
}
