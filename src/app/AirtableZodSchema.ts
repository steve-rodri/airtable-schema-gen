import pluralize from "pluralize"

import { FIELD_TYPE_MAP } from "../constants"
import { Field, FieldType, Table } from "../types"
import {
  capitalizeFirstLetter,
  escapeQuotes,
  sanitizeString,
} from "../utils/string-util"

export default class AirtableZodSchema {
  private tableName: string
  private schemaFields: string
  private transformedFields: string

  constructor(table: Table) {
    this.tableName = this.getSanitizedTableName(table.name)
    const uniqueFields = this.getUniqueFields(table.fields)
    this.schemaFields = this.generateSchemaFields(uniqueFields)
    this.transformedFields = this.generateTransformedFields(uniqueFields)
  }

  private mapFieldTypeToZodType(field: Field): string {
    if (field.type === "singleSelect") {
      return `z.enum(["${field.options.choices.map((c) => c.name).join('","')}"])`
    }

    return FIELD_TYPE_MAP[field.type] || FIELD_TYPE_MAP.default
  }

  private getSanitizedTableName(tableName: string): string {
    return pluralize.singular(sanitizeString(tableName))
  }

  private getUniqueFields(fields: Field[]): Field[] {
    const fieldMap = new Map(
      fields.map((field) => [escapeQuotes(field.name), field]),
    )
    return Array.from(fieldMap.values())
  }

  private generateSchemaField(field: Field): string {
    return `"${escapeQuotes(field.name)}": ${this.mapFieldTypeToZodType(field)}`
  }

  private generateSchemaFields(uniqueFields: Field[]): string {
    return uniqueFields
      .map((field) => this.generateSchemaField(field))
      .join(",\n  ")
  }

  private generateTransformedField(field: Field): string {
    return `${sanitizeString(escapeQuotes(field.name))}: obj["${escapeQuotes(field.name)}"]`
  }

  private generateTransformedFields(uniqueFields: Field[]): string {
    return uniqueFields
      .map((field) => this.generateTransformedField(field))
      .join(",\n  ")
  }

  public generate(): string {
    return `export const ${this.tableName}Schema = z.object({\n  ${this.schemaFields}\n}).transform(obj => ({\n  ${this.transformedFields}\n}))\nexport type ${capitalizeFirstLetter(this.tableName)}Schema = z.infer<typeof ${this.tableName}Schema>`
  }
}
