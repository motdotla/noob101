import {ux} from '@oclif/core'
import {existsSync, readFileSync} from 'fs'
import {vars} from '../vars'
import {AbortService} from '../services/abort-service'

interface DeployServiceAttrs {
  cmd: any;
}

class DeployService {
  public cmd;
  public abort;

  constructor(attrs: DeployServiceAttrs = {} as DeployServiceAttrs) {
    this.cmd = attrs.cmd
    this.abort = new AbortService({cmd: attrs.cmd})
  }

  async run(): Promise<void> {
    if (vars.missingIndexHtml) {
      this.abort.missingIndexHtml()
    }

    if (vars.emptyIndexHtml) {
      this.abort.emptyIndexHtml()
    }

    ux.action.start(`Deploying`)
    ux.action.stop()
  }
}

export {DeployService}
