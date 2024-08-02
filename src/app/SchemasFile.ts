import AirtableZodSchema from "./AirtableZodSchema"
import { FILE_HEADER } from "../constants"
import { AirtableData, Arguments } from "../types"
import { writeFileToPath } from "../utils/file-util"

export default class SchemaGenerator {
  private airtableData: AirtableData

  constructor(airtableData: AirtableData) {
    this.airtableData = airtableData
  }

  private createSchemaExports() {
    return this.airtableData.tables
      .map((table) => new AirtableZodSchema(table).generate())
      .join("\n\n")
  }

  private generateFileContent() {
    const schemaExports = this.createSchemaExports()
    const fileHeader = `${FILE_HEADER}\n\nimport { z } from 'zod'\n\n`
    return `${fileHeader}${schemaExports}`
  }

  generate(args: Arguments) {
    try {
      const { base } = this.airtableData
      const filename = `${base.name}Base.schemas.ts`
      const fileContent = this.generateFileContent()
      const schemaOutputPath = args.schemaOutput ?? args.output ?? "dist"
      writeFileToPath(`${schemaOutputPath}/${filename}`, fileContent)
      console.info(
        `Zod schemas for all tables in ${base.name} generated in dist/${filename}`,
      )
    } catch (err) {
      console.error("Error generating Zod schemas:", err)
    }
  }
}
