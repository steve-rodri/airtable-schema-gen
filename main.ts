import fs from "fs"
import path from "path"

import { getTables } from "./api"
import { BASE_ID } from "./config"
import { generateZodSchema } from "./generateZodSchema"

async function main() {
  try {
    const tables = await getTables(BASE_ID)
    const allSchemas = `import { z } from 'zod'\n\n${tables.map((table) => generateZodSchema(table.name, table.fields)).join("\n\n")}`
    fs.writeFileSync(path.join(__dirname, "airtableSchemas.ts"), allSchemas)
    console.log("Zod schemas for all tables generated in airtableSchemas.ts.")
  } catch (err) {
    console.error("Error generating Zod schemas:", err)
  }
}

main()
