import camelCase from "lodash.camelcase"
import fs from "fs"

import { FIELD_TYPE_MAP } from "./types"

export function capitalizeFirstLetter(str: string): string {
  const letters = str.split("")
  letters[0] = letters[0].toUpperCase()
  return letters.join("")
}

export function createFolderIfNotExists(folderPath: string) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true })
  }
}

export function escapeQuotes(str: string): string {
  return str.replace(/"/g, '\\"')
}

export const mapFieldTypeToZodType = (fieldType: string) =>
  FIELD_TYPE_MAP[fieldType] || FIELD_TYPE_MAP.default

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
