import fs from "fs"
import path from "path"

function createFolderIfNotExists(folderPath: string) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true })
  }
}

export function writeFileToPath(filePath: string, content: string) {
  const distPath = path.join(__dirname, filePath)
  createFolderIfNotExists(distPath)
  fs.writeFileSync(distPath, content)
}
