import {ux} from '@oclif/core'

interface DeployServiceAttrs {
  cmd;
}

class DeployService {
  public cmd;

  constructor(attrs: DeployServiceAttrs = {} as DeployServiceAttrs) {
    this.cmd = attrs.cmd
  }

  async run(): Promise<void> {
    ux.action.start(`Deploying`)
    ux.action.stop()
  }
}

export {DeployService}
