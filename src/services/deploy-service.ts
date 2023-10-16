import {ux} from '@oclif/core'
const chalk = require('chalk')
import axios, {AxiosRequestConfig} from 'axios'
import {existsSync, readFileSync} from 'fs'
import {vars} from '../vars'
import {AbortService} from '../services/abort-service'
const qrcode = require('qrcode-terminal')

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

    let deployingMsg = `Deploying ${vars.indexHtmlFilename}`
    ux.action.start(deployingMsg)
    await this.deploy()
  }

  async deploy(): Promise<void> {
    const options: AxiosRequestConfig = {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      data: {
        indexHtml: vars.indexHtml
      },
      url: this.url,
    }

    try {
      const resp: AxiosRequestConfig = await axios(options)
      const subdomain = resp.data.data.subdomain
      const url = resp.data.data.url

      ux.action.stop()

      this.cmd.log('')
      this.cmd.log(`Next visit, ${chalk.bold(url)}`)
      this.cmd.log('')
      qrcode.generate(url)
    } catch (error) {
      ux.action.stop('aborting')

      this.cmd.error(error)
    }
  }

  get url(): string {
    return vars.v1Url + '/deploy'
  }
}

export {DeployService}
