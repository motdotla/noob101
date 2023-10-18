import {ux} from '@oclif/core'
const chalk = require('chalk')
import axios, {AxiosRequestConfig} from 'axios'
import {existsSync, readFileSync} from 'fs'
import {vars} from '../vars'
import {AbortService} from '../services/abort-service'
import {EnvService} from '../services/env-service'
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
      data: this.data,
      url: this.url,
    }

    try {
      const resp: AxiosRequestConfig = await axios(options)
      const ownerKey = resp.data.data.ownerKey
      const subdomain = resp.data.data.subdomain
      const url = resp.data.data.url

      // write env settings
      new EnvService({ownerKey: ownerKey, subdomain: subdomain}).write()

      ux.action.stop()
      let generatingMsg = 'Generating QR code'
      ux.action.start(generatingMsg)
      ux.action.stop()
      qrcode.generate(url)
      this.cmd.log('')
      this.cmd.log(`Next visit, ${chalk.bold(url)}`)
    } catch (error) {
      ux.action.stop('aborting')

      this.cmd.error(error)
    }
  }

  get url(): string {
    return vars.v1Url + '/deploy'
  }

  get data(): object {
    return {
      ownerKey: vars.ownerKey,
      subdomain: vars.subdomain,
      indexHtml: vars.indexHtml
    }
  }
}

export {DeployService}
