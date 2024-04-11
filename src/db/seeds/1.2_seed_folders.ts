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
      name: "Folder 1",
    },
    {
      parentFolderId: 0,
      name: "Folder 2",
    },
    {
      parentFolderId: 1,
      name: "Folder 3",
    },
    {
      parentFolderId: 2,
      name: "Folder 4",
    },
    {
      parentFolderId: 2,
      name: "Folder 5",
    },
    {
      parentFolderId: 3,
      name: "Folder 6",
    },
  ]);
}
