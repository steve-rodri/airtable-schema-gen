import camelCase from "lodash.camelcase"

export function capitalizeFirstLetter(str: string): string {
  const letters = str.split("")
  letters[0] = letters[0].toUpperCase()
  return letters.join("")
}

export function escapeQuotes(str: string): string {
  return str.replace(/"/g, '\\"')
}

export function sanitizeString(str: string): string {
  // Remove emojis
  let sanitized = str
    .replace(/[\u{1F600}-\u{1F6FF}]/gu, "")
    .replace(/[\u{1F900}-\u{1F9FF}]/gu, "")
    .replace(/[\u{1FA70}-\u{1FAFF}]/gu, "")
    .replace(/[\u{2600}-\u{26FF}]/gu, "")
    .replace(/[\u{2700}-\u{27BF}]/gu, "")
  // Remove extra whitespace
  sanitized = sanitized.replace(/\s+/g, " ").trim()
  // Replace specific substrings
  sanitized = sanitized
    .replace(/\b3rd\b/gi, "third")
    .replace(/\b1st\b/gi, "first")
    .replace(/#/g, "num")
  // Remove leading numbers
  sanitized = sanitized.replace(/^\d+/, "")
  // Remove punctuation
  sanitized = sanitized.replace(/[^\w\s]/g, "")
  // Convert to camelCase
  sanitized = camelCase(sanitized)
  return sanitized
}

export function generateObjectString(
  obj: any,
  indentLevel: number = 2,
): string {
  const indent = " ".repeat(indentLevel)
  if (typeof obj !== "object" || obj === null) {
    return JSON.stringify(obj)
  }
  if (Array.isArray(obj)) {
    const arrayString = obj
      .map((item) => generateObjectString(item, indentLevel + 2))
      .join(",\n" + indent)
    return `[\n${indent}${arrayString}\n${" ".repeat(indentLevel - 2)}]`
  }
  const objString = Object.entries(obj)
    .map(
      ([key, value]) =>
        `${indent}${key}: ${generateObjectString(value, indentLevel + 2)}`,
    )
    .join(",\n")
  return `{\n${objString}\n${" ".repeat(indentLevel - 2)}}`
}
