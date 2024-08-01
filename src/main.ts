import { BASE_NAME } from "./config"
import { generateBaseAccessor } from "./generateBaseAccessor"
import { generateZodSchemas } from "./generateZodSchemas"
import { sanitizeString } from "./string-util"

async function main() {
  const baseName = sanitizeString(BASE_NAME ?? "Default")
  generateBaseAccessor(baseName)
  generateZodSchemas(baseName)
}

main()
