import fs from "fs"
import path from "path"

function createFolderIfNotExists(folderPath: string) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true })
  }
}

export function writeFileToDist(filename: string, content: string) {
  const distPath = path.join(__dirname, "../dist")
  createFolderIfNotExists(distPath)
  fs.writeFileSync(path.join(distPath, filename), content)
}
