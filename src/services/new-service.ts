import {ux} from '@oclif/core'
const chalk = require('chalk')
import {writeFileSync} from 'fs'
import {vars} from '../vars'
import {AbortService} from '../services/abort-service'

interface NewServiceAttrs {
  cmd: any;
}

class NewService {
  public cmd;
  public abort;

  constructor(attrs: NewServiceAttrs = {} as NewServiceAttrs) {
    this.cmd = attrs.cmd
    this.abort = new AbortService({cmd: attrs.cmd})
  }

  async run(): Promise<void> {
    if (vars.missingIndexHtml) {
      let creatingMsg = `Creating ${vars.indexHtmlFilename}`
      ux.action.start(creatingMsg)

      writeFileSync(vars.indexHtmlFilename, this.indexHtmlContent())

      ux.action.stop()

      this.cmd.log('')
      this.cmd.log(`Next run, ${chalk.bold(`${vars.cli} deploy`)}`)
    } else {
      this.abort.existingIndexHtml()
    }
  }

  indexHtmlContent(): string {
    const s = `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <h1>Hello World</h1>
  <p>You created your first website, noob!</p>
  <p>Next run, <strong>${vars.cli} edit</strong></p>
</body>
</html>`

    return s
  }
}

export {NewService}
