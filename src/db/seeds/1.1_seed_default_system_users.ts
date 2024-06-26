import bcrypt from "bcrypt";
import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  return knex("systemUsers").insert([
    {
      email: "admin@email.com",
      password: await bcrypt.hash("admin", 10),
      role: "admin",
    },
    {
      email: "manager@email.com",
      password: await bcrypt.hash("manager", 10),
      role: "mngr",
    },
    {
      email: "staff@email.com",
      password: await bcrypt.hash("staff", 10),
      role: "staff",
    },
  ]);
}
