import {ux} from '@oclif/core'
const chalk = require('chalk')
import axios, {AxiosRequestConfig} from 'axios'
import {existsSync, readFileSync} from 'fs'
import {vars} from '../vars'
import {AbortService} from '../services/abort-service'
import {EnvService} from '../services/env-service'
const qrcode = require('qrcode-terminal')

interface RenameServiceAttrs {
  cmd: any;
  newSubdomain: string;
}

class RenameService {
  public cmd;
  public newSubdomain;
  public abort;

  constructor(attrs: RenameServiceAttrs = {} as RenameServiceAttrs) {
    this.cmd = attrs.cmd
    this.newSubdomain = attrs.newSubdomain
    this.abort = new AbortService({cmd: attrs.cmd})
  }

  async run(): Promise<void> {
    if (vars.missingIndexHtml) {
      this.abort.missingIndexHtml()
    }

    if (vars.emptyIndexHtml) {
      this.abort.emptyIndexHtml()
    }

    let renamingMsg = `Renaming ${vars.subdomain} to ${this.newSubdomain}`
    ux.action.start(renamingMsg)
    await this.rename()
  }

  async rename(): Promise<void> {
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

      this.abort.handleError(error, 'RENAME_ERROR')
    }
  }

  get url(): string {
    return vars.v1Url + '/rename'
  }

  get data(): object {
    return {
      ownerKey: vars.ownerKey,
      subdomain: vars.subdomain,
      newSubdomain: this.newSubdomain
    }
  }
}

export {RenameService}
