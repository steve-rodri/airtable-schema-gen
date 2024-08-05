export const FILE_HEADER =
  "/* THIS FILE WAS AUTO GENERATED USING A SCRIPT. DO NOT EDIT MANUALLY.*/\n\n"

export const FIELD_TYPE_MAP: Record<string, string> = {
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
  default: "z.any().optional()",
}
