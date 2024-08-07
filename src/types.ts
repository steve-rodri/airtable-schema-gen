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

export interface SelectChoice {
  id: string
  name: string
  color: string
}

export interface SelectOptions {
  choices: SelectChoice[]
}

export interface MultipeRecordLinksOptions {
  linkedTableId: string
  isReversed: boolean
  prefersSingleRecordLink: boolean
  inverseLinkFieldId: string
}

export interface MultipeRecordLinksField {
  id: string
  name: string
  type: "multipleRecordLinks"
  options: MultipeRecordLinksOptions
}

export interface SelectField {
  id: string
  name: string
  type: "singleSelect" | "multipleSelects"
  options: SelectOptions
}

export interface GenericField {
  id: string
  name: string
  type: Exclude<FieldType, "singleSelect" | "multipleSelects">
  options?: { [key: string]: any }
}

export type Field = SelectField | GenericField

export interface TransformedTable {
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
