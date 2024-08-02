import { sanitizeString } from "../utils/string-util"
import { getTables } from "../infra/api"
import { Arguments, AirtableData } from "../types"

export async function getAirtableData(args: Arguments): Promise<AirtableData> {
  const baseName = sanitizeString(args.baseName ?? "Default")
  const tables = await getTables(args.baseId, args.tableIds)
  const base = { id: args.baseId, name: baseName }
  return { base, tables }
}
