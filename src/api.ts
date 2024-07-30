import { API_KEY } from "./config"
import { Table } from "./types"

export async function getTables(baseId: string) {
  const response = await fetch(
    `https://api.airtable.com/v0/meta/bases/${baseId}/tables`,
    {
      headers: { Authorization: `Bearer ${API_KEY}` },
    },
  )
  return (await response.json()).tables as Table[]
}
