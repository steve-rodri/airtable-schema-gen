import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { Arguments } from "../types"
import { API_KEY, BASE_ID, BASE_NAME } from "../infra/config"

export const getArgs = () => {
  const argv = yargs(hideBin(process.argv))
    .option("api-key", {
      description:
        "Your Airtable api key. Reads AIRTABLE_API_KEY in environment. (required)",
      type: "string",
      demandOption: !Boolean(BASE_ID),
    })
    .option("base-id", {
      description:
        "Your Airtable base id. Reads AIRTABLE_BASE_ID in environment. (required)",
      type: "string",
      demandOption: !Boolean(BASE_ID),
    })
    .option("base-name", {
      description:
        "Your Airtable base name. Used for the accessor. Reads AIRTABLE_BASE_NAME in environment. (optional: defaults to 'default')",
      type: "string",
    })
    .option("table-ids", {
      description:
        "Space separated list of Airtable table IDs to include (optional).",
      type: "array",
    })
    .option("out-dir", {
      alias: "o",
      description: "Output directory. (optional: defaults to 'out')",
      type: "string",
    })
    .option("schema-out-dir", {
      description: "Output directory for the schemas file.",
      type: "string",
    })
    .option("accessor-out-dir", {
      description: "Output directory for the accessor file.",
      type: "string",
    })
    .option("verbose", {
      alias: "v",
      description: "Enable verbose logging.",
      type: "boolean",
      default: false,
    })
    .help()
    .alias("help", "h").argv as Arguments

  const { tableIds, outDir, schemaOutDir, accessorOutDir, verbose } = argv
  const apiKey = argv.apiKey || API_KEY
  const baseId = argv.baseId || BASE_ID
  const baseName = argv.baseName || BASE_NAME

  if (verbose) {
    console.log(`API key: ${Boolean(apiKey)}`)
    console.log(`Base ID: ${baseId}`)
    console.log(`Base name: ${baseName}`)
    if (tableIds) console.log(`Table IDs: ${tableIds}`)
    if (outDir) console.log(`Output directory: ${outDir}`)
    if (schemaOutDir)
      console.log(`Schemas File output directory: ${schemaOutDir}`)
    if (accessorOutDir)
      console.log(`Accessor File output directory: ${accessorOutDir}`)
  }

  return { ...argv, apiKey, baseId, baseName }
}
