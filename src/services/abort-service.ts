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

  handleError(error: any, fallbackErrorCode: string): void {
    let errorMessage = error
    let errorCode = fallbackErrorCode
    let suggestions = []

    if (error.response && error.response.data && error.response.data.error) {
      const error1 = error.response.data.error

      errorMessage = error1.message
      if (error1.code) {
        errorCode = error1.code
      }
      if (error1.suggestions) {
        suggestions = error1.suggestions
      }
    }

    this.error(errorMessage, {code: errorCode, ref: '', suggestions: suggestions})
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
      suggestions: [`Run, ${chalk.bold(`${vars.cli} new`)}`],
    })
  }

  emptyIndexHtml(): void {
    this.error(`Empty ${vars.indexHtmlFilename}.`, {
      code: 'EMPTY_INDEX_HTML',
      ref: '',
      suggestions: [`Run, ${chalk.bold(`${vars.cli} edit`)}`],
    })
  }

  existingIndexHtml(): void {
    this.error(`Existing ${vars.indexHtmlFilename}.`, {
      code: 'EXISTING_INDEX_HTML',
      ref: '',
      suggestions: [`Run, ${chalk.bold(`${vars.cli} deploy`)}`],
    })
  }

}

export {AbortService}
