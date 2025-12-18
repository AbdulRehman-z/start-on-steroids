import { env } from "@/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/db/mirgrations",
  schema: "./src/db/schemas/*",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DB_URL,
  },
  verbose: true,
  strict: true,
});
