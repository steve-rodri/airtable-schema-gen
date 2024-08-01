import { BASE_NAME } from "./infra/config"
import { generateBaseAccessor } from "./app/accessor/generateBaseAccessor"
import { generateZodSchemas } from "./app/schemas/generateZodSchemas"
import { sanitizeString } from "./utils/string-util"

async function main() {
  const baseName = sanitizeString(BASE_NAME ?? "Default")
  generateBaseAccessor(baseName)
  generateZodSchemas(baseName)
}

main()
