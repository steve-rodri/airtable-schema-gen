export const FILE_HEADER =
  "/* THIS FILE WAS AUTO GENERATED USING A SCRIPT. DO NOT EDIT MANUALLY.*/\n\n"

export const FIELD_TYPE_MAP = {
  singleLineText: "z.string().optional()",
  multilineText: "z.string().optional()",
  richText: "z.string().optional()",
  url: "z.string().optional()",
  email: "z.string().optional()",
  phoneNumber: "z.string().optional()",
  number: "z.number().optional()",
  checkbox: "z.boolean().optional()",
  date: "z.string().optional()",
  dateTime: "z.string().optional()",
  createdTime: "z.string().optional()",
  lastModifiedTime: "z.string().optional()",
  percent: "z.number().optional()",
  rating: "z.number().min(1).optional()",
  currency: "z.number().optional()",
  button:
    "z.object({ label: z.string().nullish(), url: z.string().nullish() }).optional()",
  createdBy:
    "z.object({ id: z.string().nullish(), name: z.string().nullish(), email: z.string().nullish() }).optional()",
  formula:
    "z.union([z.string(), z.number(), z.array(z.union([z.string(), z.number()])), z.object({}).catchall(z.any())]).optional()",
  rollup: "z.union([z.string(), z.number()]).optional()",
  lookup: "z.string().optional()",
  default: "z.any().optional()",
} as const

// multipleLookupValues
// multipleAttachments
