import BaseAccessor from "./BaseAccessor"
import { getTables } from "./api"
import { BASE_ID } from "./config"
import { writeFileToDist } from "./util"

const fileHeader =
  "/* THIS FILE WAS AUTO GENERATED USING A SCRIPT. DO NOT EDIT MANUALLY.*/\n\n"

export async function generateBaseAccessor(baseName = "Default") {
  try {
    const tables = await getTables(BASE_ID)
    const accessorExport = new BaseAccessor(tables).create()
    const fileContent = `${fileHeader}${accessorExport}`
    const filename = `${baseName}Base.accessor.ts`
    writeFileToDist(filename, fileContent)
    console.info(`SDK accessor generated for ${baseName} at dist/${filename}`)
  } catch (err) {
    console.error("Error generating SDK accessors:", err)
  }
}
