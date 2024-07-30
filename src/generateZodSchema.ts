import pluralize from "pluralize"

import { Field } from "./types"
import {
  capitalizeFirstLetter,
  escapeQuotes,
  mapFieldTypeToZodType,
  sanitizeString,
} from "./util"

function getSanitizedTableName(tableName: string): string {
  return pluralize.singular(sanitizeString(tableName))
}

function getUniqueFields(fields: Field[]): Field[] {
  const fieldMap = new Map(
    fields.map((field) => [escapeQuotes(field.name), field]),
  )
  return Array.from(fieldMap.values())
}

function generateSchemaFields(uniqueFields: Field[]): string {
  return uniqueFields
    .map(
      (field) =>
        `"${escapeQuotes(field.name)}": ${mapFieldTypeToZodType(field.type)}`,
    )
    .join(",\n  ")
}

function generateTransformedSchemaFields(uniqueFields: Field[]): string {
  return uniqueFields
    .map(
      (field) =>
        `${sanitizeString(escapeQuotes(field.name))}: obj["${escapeQuotes(field.name)}"]`,
    )
    .join(",\n  ")
}

export function generateZodSchema(tableName: string, fields: Field[]): string {
  const sanitizedTableName = getSanitizedTableName(tableName)
  const uniqueFields = getUniqueFields(fields)
  const schemaFields = generateSchemaFields(uniqueFields)
  const transformedSchemaFields = generateTransformedSchemaFields(uniqueFields)
  return `export const ${sanitizedTableName}Schema = z.object({\n  ${schemaFields}\n}).transform(obj => ({\n  ${transformedSchemaFields}\n}))\nexport type ${capitalizeFirstLetter(sanitizedTableName)}Schema = z.infer<typeof ${sanitizedTableName}Schema>`
}
