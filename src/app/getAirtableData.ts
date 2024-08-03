import { sanitizeString } from "../utils/string-util"
import { getTables } from "../infra/api"
import { Arguments, AirtableData } from "../types"

export async function getAirtableData(args: Arguments): Promise<AirtableData> {
  const tables = await getTables(args)
  const baseName = sanitizeString(args.baseName ?? "Default")
  const base = { id: args.baseId, name: baseName }
  return { base, tables }
}
