import {existsSync, readFileSync} from 'fs'

export class Vars {
  get cli(): string {
    // read from process.env first, then then default
    return process.env.NOOB101_CLI || 'npx noob101@latest'
  }

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

  get indexHtml(): string {
    const content = readFileSync(this.indexHtmlFilename, 'utf8')

    return content
  }

  get v1Url(): string {
    // read from process.env first, then default
    return process.env.NOOB101_V1_URL || 'https://v1.noob101.com'
  }

  get envFilename(): string {
    return '.env'
  }

  get existingEnv(): boolean {
    return existsSync(this.envFilename)
  }

  get missingEnv(): boolean {
    return !existsSync(this.envFilename)
  }
}

export const vars = new Vars()
