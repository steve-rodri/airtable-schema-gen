import { FIELD_TYPE_MAP } from "./constants"

export interface AirtableData {
  base: { id: string; name: string }
  tables: Table[]
}

export interface Table {
  id: string
  name: string
  fields: Field[]
}

export type FieldType = keyof typeof FIELD_TYPE_MAP

export type SingleSelectChoice = {
  id: string
  name: string
  color: string
}

export type SingleSelectOptions = {
  choices: SingleSelectChoice[]
}

export interface SingleSelectField {
  id: string
  name: string
  type: "singleSelect"
  options: SingleSelectOptions
}

export interface GenericField {
  id: string
  name: string
  type: Exclude<FieldType, "singleSelect">
  options?: { [key: string]: any }
}

export type Field = SingleSelectField | GenericField

export type TransformedTable = {
  id: string
  fields: Record<string, Field>
}

export interface Arguments {
  apiKey: string
  baseId: string
  baseName?: string
  tableIds?: string[]
  outDir?: string
  schemaOutDir?: string
  accessorOutDir?: string
  verbose?: boolean
}

export interface WriteFileOptions {
  filePath?: string
  filename: string
  content: string
}
