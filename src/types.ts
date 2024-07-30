export interface Table {
  id: string
  name: string
  fields: Field[]
}

export interface Field {
  name: string
  type: string
}

export const FIELD_TYPE_MAP: Record<string, string> = {
  singleLineText: "z.string()",
  multilineText: "z.string()",
  richText: "z.string()",
  url: "z.string()",
  email: "z.string()",
  phoneNumber: "z.string()",
  number: "z.number()",
  checkbox: "z.boolean()",
  date: "z.date()",
  dateTime: "z.date()",
  default: "z.any()",
}
