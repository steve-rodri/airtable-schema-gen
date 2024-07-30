import pluralize from "pluralize"

import { Field } from "./types"
import {
  capitalizeFirstLetter,
  escapeQuotes,
  mapFieldTypeToZodType,
  sanitizeString,
} from "./util"

export function generateZodSchema(tableName: string, fields: Field[]): string {
  const sanitizedTableName = pluralize.singular(sanitizeString(tableName))
  const seenFields = new Set<string>()
  const uniqueFields = fields.filter((field) => {
    if (seenFields.has(field.name)) {
      return false
    }
    seenFields.add(field.name)
    return true
  })
  const schemaFields = uniqueFields
    .map(
      (field) =>
        `"${escapeQuotes(field.name)}": ${mapFieldTypeToZodType(field.type)}`,
    )
    .join(",\n  ")
  const transformedSchemaFields = uniqueFields
    .map(
      (field) =>
        `${sanitizeString(escapeQuotes(field.name))}: obj["${escapeQuotes(field.name)}"]`,
    )
    .join(",\n  ")
  return `export const ${sanitizedTableName}Schema = z.object({\n  ${schemaFields}\n}).transform(obj => ({\n  ${transformedSchemaFields}\n}))\nexport type ${capitalizeFirstLetter(sanitizedTableName)}Schema = z.infer<typeof ${sanitizedTableName}Schema>`
}
