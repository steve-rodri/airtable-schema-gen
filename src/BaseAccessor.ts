import { Field, Table, TransformedTable } from "./types"
import { BASE_ID, BASE_NAME } from "./config"
import {
  escapeQuotes,
  generateObjectString,
  sanitizeString,
} from "./string-util"

export default class BaseAccessor {
  private tables: Table[]

  constructor(tables: Table[]) {
    this.tables = tables
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
      id: BASE_ID,
      tables: this.transformTables(this.tables),
    }
  }

  create() {
    const accessor = this.generateAccessor()
    const sanitizedBaseName = sanitizeString(BASE_NAME ?? "Default")
    const accessorString = generateObjectString(accessor, 2)
    return `export const ${sanitizedBaseName}BaseAccessor = ${accessorString}`
  }
}
