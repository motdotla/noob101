import {existsSync, readFileSync} from 'fs'

export class Vars {
  get indexHtmlFilename(): string {
    return 'index.html'
  }

  get existingIndexHtml(): boolean {
    return existsSync(this.indexHtmlFilename)
  }

  get missingIndexHtml(): boolean {
    return !existsSync(this.indexHtmlFilename)
  }

  get emptyIndexHtml(): boolean {
    if (this.missingIndexHtml) {
      return false
    }

    const content = readFileSync(this.indexHtmlFilename, 'utf8')

    return !(content && content.toString().length > 0)
  }
}

export const vars = new Vars()
