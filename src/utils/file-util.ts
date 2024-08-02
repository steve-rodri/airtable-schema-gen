import fs from "fs"
import path from "path"
import { WriteFileOptions } from "../types"

function createFolderIfNotExists(folderPath: string) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true })
  }
}

export function writeFileToPath({
  filePath = "dist",
  filename,
  content,
}: WriteFileOptions) {
  createFolderIfNotExists(filePath)
  fs.writeFileSync(path.join(filePath, filename), content)
}
