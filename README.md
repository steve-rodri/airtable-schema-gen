# Airtable to Zod Code Generator

An Airtable to Zod Code Generator that generates zod schemas for Airtable
tables.

We also ship an accessor to handle Airtable's JS SDK.

## Usage

```sh
npx airtable-schema-gen
```

## CLI Options

```sh
--version              Show version number                       [boolean]
--api-key              Your Airtable api key. Reads AIRTABLE_API_KEY in en
                       vironment. (required)                      [string]
--base-id              Your Airtable base id. Reads AIRTABLE_BASE_ID in en
                       vironment. (required)                      [string]
--base-name            Your Airtable base name. Used for the accessor. Rea
                       ds AIRTABLE_BASE_NAME in environment. (optional: de
                       faults to 'default')                       [string]
--table-ids            Space separated list of Airtable table IDs to inclu
                       de (optional).                              [array]
--out-dir              Output directory. (optional: defaults to 'out')
                                                                  [string]
--schema-out-dir       Output directory for the schemas file.     [string]
--accessor-out-dir     Output directory for the accessor file.    [string]
-v, --verbose              Enable verbose logging.  [boolean] [default: false]
-h, --help                 Show help                                 [boolean]
```

## Example

```ts
import Airtable from "airtable"
import { defaultBaseAccessor } from "./defaultBase.accessor"
import * as defaultSchemas from "./defaultBase.schemas"

const apiKey = process.env.AIRTABLE_API_KEY!

Airtable.configure({
  apiKey,
  endpointUrl: "https://api.airtable.com",
})

// You can export this from here or create an airtable object,
// add this as a key, and export the airtable object instead.
export const defaultBase = {
  ...defaultSchemas,
  base: Airtable.base(defaultBaseAccessor.id)
  tables: defaultTables,
}
```

Then somewhere else:

```ts
import { defaultBase } from "./wherever-you-keep-this"

const { base, tables, exampleRecordSchema } = defaultBase

const exampleData = await base(tables.example.id)
  .select()
  .then((records) =>
    records.map((record) => {
      const result = exampleRecordSchema.parse(record.fields)
      // add the id to the schema if you want
      return { ...result, id: record.id }
      // otherwise return the result
      return result
    }),
  )
```
