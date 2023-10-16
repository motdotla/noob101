import {ux} from '@oclif/core'
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
      let creatingMsg = `Creating (${vars.indexHtmlFilename})`
      ux.action.start(creatingMsg)

      writeFileSync(vars.indexHtmlFilename, this.indexHtmlContent())

      ux.action.stop()
    } else {
      // send message that index.html already exists
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
  <p>Welcome to my website for noobs!</p>
</body>
</html>`

    return s
  }
}

export {NewService}
