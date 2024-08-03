import { FILE_HEADER } from "../constants"
import {
  Arguments,
  Field,
  AirtableData,
  Table,
  TransformedTable,
} from "../types"
import { writeFileToPath } from "../utils/file-util"
import {
  escapeQuotes,
  generateObjectString,
  sanitizeString,
} from "../utils/string-util"

export default class AccessorFile {
  private airtableData: AirtableData

  constructor(airtableData: AirtableData) {
    this.airtableData = airtableData
  }

  private getUniqueFields(fields: Field[]): Field[] {
    const fieldMap = new Map(
      fields.map((field) => [escapeQuotes(field.name), field]),
    )
    return Array.from(fieldMap.values())
  }

  private transformFields(fields: Field[]) {
    const uniqueFields = this.getUniqueFields(fields)
    return uniqueFields.reduce(
      (obj, field) => {
        const sanitizedFieldName = sanitizeString(field.name)
        obj[sanitizedFieldName] = {
          id: field.id,
          name: field.name,
          type: field.type,
        }
        return obj
      },
      {} as Record<string, Field>,
    )
  }

  private transformTables(tables: Table[]) {
    return tables.reduce(
      (obj, table) => {
        const sanitizedTableName = sanitizeString(table.name)
        obj[sanitizedTableName] = {
          id: table.id,
          fields: this.transformFields(table.fields),
        }

        return obj
      },
      {} as Record<string, TransformedTable>,
    )
  }

  private generateAccessor() {
    return {
      id: this.airtableData.base.id,
      tables: this.transformTables(this.airtableData.tables),
    }
  }

  private generateFileContent() {
    const accessor = this.generateAccessor()
    const objectString = generateObjectString(accessor, 2)
    const exportString = `export const ${this.airtableData.base.name}BaseAccessor = ${objectString}`
    return `${FILE_HEADER}${exportString}`
  }

  generate(args: Arguments) {
    try {
      const content = this.generateFileContent()
      const filename = `${this.airtableData.base.name}Base.accessor.ts`
      const outDir = args.accessorOutDir ?? args.outDir
      writeFileToPath({ filePath: outDir, filename, content })
      console.info(
        `SDK accessor generated for ${this.airtableData.base.name} at dist/${filename}`,
      )
    } catch (err) {
      console.error("Error generating SDK accessors:", err)
    }
  }
}
