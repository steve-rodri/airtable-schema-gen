export interface AirtableData {
  base: { id: string; name: string }
  tables: Table[]
}

export interface Table {
  id: string
  name: string
  fields: Field[]
}

export interface Field {
  id: string
  name: string
  type: string
}

export type TransformedTable = {
  id: string
  fields: Record<string, Field>
}

export interface Arguments {
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
