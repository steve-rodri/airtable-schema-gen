import { Arguments, Table } from "../types"

export async function getTables({ baseId, apiKey, tableIds }: Arguments) {
  const response = await fetch(
    `https://api.airtable.com/v0/meta/bases/${baseId}/tables`,
    {
      headers: { Authorization: `Bearer ${apiKey}` },
    },
  )
  const tables = (await response.json()).tables as Table[]
  if (tableIds) return tables.filter((t) => tableIds.includes(t.id))
  return tables
}
