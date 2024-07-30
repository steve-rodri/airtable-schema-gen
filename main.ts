import camelCase from "lodash.camelcase"
import fs from "fs"
import path from "path"
import pluralize from "pluralize"
import * as dotenv from "dotenv"

dotenv.config()

const API_KEY = process.env.AIRTABLE_API_KEY!
const BASE_ID = process.env.AIRTABLE_BASE_ID!

interface Table {
  id: string
  name: string
  fields: Field[]
}

interface Field {
  name: string
  type: string
}

const FIELD_TYPE_MAP: Record<string, string> = {
  singleLineText: "z.string()",
  multilineText: "z.string()",
  richText: "z.string()",
  url: "z.string()",
  email: "z.string()",
  phoneNumber: "z.string()",
  number: "z.number()",
  checkbox: "z.boolean()",
  date: "z.date()",
  dateTime: "z.date()",
  default: "z.any()",
}

function sanitizeString(str: string): string {
  // Remove emojis
  let sanitized = str
    .replace(/[\u{1F600}-\u{1F6FF}]/gu, "")
    .replace(/[\u{1F900}-\u{1F9FF}]/gu, "")
    .replace(/[\u{1FA70}-\u{1FAFF}]/gu, "")
    .replace(/[\u{2600}-\u{26FF}]/gu, "")
    .replace(/[\u{2700}-\u{27BF}]/gu, "")
  // Remove leading numbers
  sanitized = sanitized.replace(/^\d+/, "")
  // Remove extra whitespace
  sanitized = sanitized.replace(/\s+/g, " ").trim()
  // Replace specific substrings
  sanitized = sanitized
    .replace(/3rd/g, "third")
    .replace(/1st/g, "first")
    .replace(/#/g, "num")
  // Remove punctuation
  sanitized = sanitized.replace(/[^\w\s]/g, "")
  // Convert to camelCase
  sanitized = camelCase(sanitized)
  return sanitized
}

async function getTables(baseId: string) {
  const response = await fetch(
    `https://api.airtable.com/v0/meta/bases/${baseId}/tables`,
    {
      headers: { Authorization: `Bearer ${API_KEY}` },
    },
  )
  return (await response.json()).tables as Table[]
}

const mapFieldTypeToZodType = (fieldType: string) =>
  FIELD_TYPE_MAP[fieldType] || FIELD_TYPE_MAP.default

function escapeQuotes(str: string): string {
  return str.replace(/"/g, '\\"')
}

function capitalizeFirstLetter(str: string): string {
  const letters = str.split("")
  letters[0] = letters[0].toUpperCase()
  return letters.join("")
}

function generateZodSchema(tableName: string, fields: Field[]): string {
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
