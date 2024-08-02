#!/usr/bin/env node

import { getArgs } from "./app/getArgs"
import { getAirtableData } from "./app/getAirtableData"
import AccessorFile from "./app/AccessorFile"
import SchemasFile from "./app/SchemasFile"

async function main() {
  const args = getArgs()
  const airtableData = await getAirtableData(args)
  const accessorFile = new AccessorFile(airtableData)
  const schemasFile = new SchemasFile(airtableData)
  accessorFile.generate(args)
  schemasFile.generate(args)
}

main()
