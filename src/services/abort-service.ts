const chalk = require('chalk')
import {vars} from '../vars'

interface AbortServiceAttrs {
  cmd: any;
}

interface ErrorInfo {
  code: string;
  suggestions: Array<string>;
  ref: string;
}

class AbortService {
  public cmd;

  constructor(attrs: AbortServiceAttrs = {} as AbortServiceAttrs) {
    this.cmd = attrs.cmd
  }

  error(msg: string, obj: ErrorInfo): void {
    this.cmd.log(`${chalk.red('x')} Aborted.`)

    if (obj.code) {
      this.code(obj.code)
    }

    if (obj.suggestions[0]) {
      this.suggestion(obj.suggestions[0])
    }

    this.cmd.error(msg)
  }

  code(code: string): void {
    this.cmd.log(`Code: ${code}`)
  }

  suggestion(suggestion: string): void {
    this.cmd.log(`Suggestion: ${suggestion}`)
  }

  // quit(): void {
  //   this.log.plain(`${chalk.red('x')} Aborted.`)
  //   this.cmd.exit()
  // }

  missingIndexHtml(): void {
    this.error(`Missing ${vars.indexHtmlFilename}.`, {
      code: 'MISSING_INDEX_HTML',
      ref: '',
      suggestions: [`Run, ${chalk.bold('touch index.html')}`],
    })
  }

  emptyIndexHtml(): void {
    this.error(`Empty ${vars.indexHtmlFilename}.`, {
      code: 'EMPTY_INDEX_HTML',
      ref: '',
      suggestions: [`Run, ${chalk.bold('nano index.html')}`],
    })
  }
}

export {AbortService}
