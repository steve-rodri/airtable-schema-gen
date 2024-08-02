import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { Arguments } from "../types"

export const getArgs = () => {
  const argv = yargs(hideBin(process.argv))
    .option("base-id", {
      description: "Your Airtable base id. (required)",
      type: "string",
      demandOption: true,
    })
    .option("base-name", {
      description:
        "Your Airtable base name. Used for the accessor. (optional: defaults to 'default')",
      type: "string",
    })
    .option("table-ids", {
      description:
        "Comma separated list of Airtable table IDs to include (optional).",
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

  const { baseName, tableIds, output, schemaOutput, accessorOutput, verbose } =
    argv

  if (verbose) {
    console.log(`Base name: ${baseName}`)
    console.log(`Table IDs: ${tableIds}`)
    if (output) console.log(`Output file: ${output}`)
    if (schemaOutput) console.log(`Schema output file: ${schemaOutput}`)
    if (accessorOutput) console.log(`Accessor output file: ${accessorOutput}`)
  }

  return argv
}
