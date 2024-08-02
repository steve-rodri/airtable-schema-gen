export const FILE_HEADER =
  "/* THIS FILE WAS AUTO GENERATED USING A SCRIPT. DO NOT EDIT MANUALLY.*/\n\n"

export const FIELD_TYPE_MAP: Record<string, string> = {
  singleLineText: "z.string()",
  multilineText: "z.string()",
  richText: "z.string()",
  url: "z.string()",
  email: "z.string()",
  phoneNumber: "z.string()",
  number: "z.number()",
  checkbox: "z.boolean()",
  date: "z.string()",
  dateTime: "z.string()",
  default: "z.any()",
}
