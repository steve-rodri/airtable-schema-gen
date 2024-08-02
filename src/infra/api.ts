import { API_KEY } from "./config"
import { Table } from "../types"

export async function getTables(baseId: string, tableIds?: string[]) {
  const response = await fetch(
    `https://api.airtable.com/v0/meta/bases/${baseId}/tables`,
    {
      headers: { Authorization: `Bearer ${API_KEY}` },
    },
  )
  const tables = (await response.json()).tables as Table[]
  if (tableIds) return tables.filter((t) => tableIds.includes(t.id))
  return tables
}
