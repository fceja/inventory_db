import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  return knex("folders").insert([
    {
      folder_id: 0,
      parent_folder_id: null,
      name: "Root Folder",
    },
    {
      parent_folder_id: 0,
      name: "Folder 1",
    },
    {
      parent_folder_id: 0,
      name: "Folder 2",
    },
    {
      parent_folder_id: 1,
      name: "Folder 3",
    },
    {
      parent_folder_id: 2,
      name: "Folder 4",
    },
    {
      parent_folder_id: 2,
      name: "Folder 5",
    },
    {
      parent_folder_id: 3,
      name: "Folder 6",
    },
  ]);
}
