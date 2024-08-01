# Airtable to Zod Code Generator

An Airtable to Zod Code Generator that generates zod schemas for Airtable
tables.

We also ship an accessor to handle Airtable's JS SDK.

## Installation

```sh
npm install
```

## Environment Variables

create a .env file and add the following:

```sh
AIRTABLE_API_KEY=
AIRTABLE_BASE_ID=
AIRTABLE_BASE_NAME=
```

## Generate Code

```sh
npm start
```

this will generate code in the dist folder

## Example Usage

Create an init file in the same folder as the generated code with the following:

```ts
import Airtable from "airtable"
import { defaultBaseAccessor } from "./defaultBase.accessor"
import * as defaultSchemas from "./defaultBase.schemas"

const apiKey = process.env.AIRTABLE_API_KEY!

Airtable.configure({
  apiKey,
  endpointUrl: "https://api.airtable.com",
})

export const defaultBase = Airtable.base(defaultBaseAccessor.id)
export const { tables: defaultTables } = defaultBaseAccessor

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
