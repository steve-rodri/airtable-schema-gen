import { getTables } from "./api"
import { BASE_ID } from "./config"
import { writeFileToDist } from "./util"
import AirtableZodSchema from "./AirtableZodSchema"
import { Table } from "./types"

const fileHeader =
  "/* THIS FILE WAS AUTO GENERATED USING A SCRIPT. DO NOT EDIT MANUALLY.*/\n\nimport { z } from 'zod'\n\n"

function createSchemaExports(tables: Table[]) {
  return tables
    .map((table) => new AirtableZodSchema(table).create())
    .join("\n\n")
}

export async function generateZodSchemas(baseName = "default") {
  try {
    const tables = await getTables(BASE_ID)
    const schemaExports = createSchemaExports(tables)
    const fileContent = `${fileHeader}${schemaExports}`
    const filename = `${baseName}Base.schemas.ts`
    writeFileToDist(filename, fileContent)
    console.info(
      `Zod schemas for all tables in ${baseName} generated in dist/${filename}`,
    )
  } catch (err) {
    console.error("Error generating Zod schemas:", err)
  }
}
