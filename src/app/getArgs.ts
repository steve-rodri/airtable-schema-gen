import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { Arguments } from "../types"
import { BASE_ID, BASE_NAME } from "../infra/config"

export const getArgs = () => {
  const argv = yargs(hideBin(process.argv))
    .option("base-id", {
      description: "Your Airtable base id. (required)",
      type: "string",
      demandOption: !Boolean(BASE_ID),
    })
    .option("base-name", {
      description:
        "Your Airtable base name. Used for the accessor. (optional: defaults to 'default')",
      type: "string",
    })
    .option("table-ids", {
      description:
        "Space separated list of Airtable table IDs to include (optional).",
      type: "array",
    })
    .option("out-dir", {
      alias: "o",
      description: "Output directory.",
      type: "string",
    })
    .option("schema-output-dir", {
      description: "Output directory for the schemas file.",
      type: "string",
    })
    .option("accessor-output-dir", {
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
  const baseId = argv.baseId || BASE_ID
  const baseName = argv.baseName || BASE_NAME

  if (verbose) {
    console.log(`Base ID: ${baseId}`)
    console.log(`Base name: ${baseName}`)
    console.log(`Table IDs: ${tableIds}`)
    if (outDir) console.log(`Output directory: ${outDir}`)
    if (schemaOutDir)
      console.log(`Schemas File output directory: ${schemaOutDir}`)
    if (accessorOutDir)
      console.log(`Accessor File output directory: ${accessorOutDir}`)
  }

  return { ...argv, baseId, baseName }
}
